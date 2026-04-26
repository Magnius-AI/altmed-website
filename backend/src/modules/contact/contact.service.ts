import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { ContactSubmission } from "../../database/entities";
import { CreateContactSubmissionDto } from "./dto";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactSubmission)
    private readonly repository: Repository<ContactSubmission>,
    private readonly configService: ConfigService
  ) {}

  async submit(dto: CreateContactSubmissionDto, ipAddress?: string) {
    const recentSubmissions = await this.repository.count({
      where: {
        ipAddress: ipAddress ?? "",
        submittedAt: MoreThan(new Date(Date.now() - 60 * 60 * 1000))
      }
    });

    if (recentSubmissions >= 3) {
      throw new HttpException(
        "Please wait before submitting another request, or call us at (703) 361-4357.",
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    const isBot =
      Boolean(dto.website) || !dto.passedTimeCheck || (dto.recaptchaScore ?? 0) < 0.5;
    const botReason = dto.website
      ? "honeypot"
      : !dto.passedTimeCheck
        ? "submitted_too_fast"
        : (dto.recaptchaScore ?? 0) < 0.5
          ? "low_recaptcha_score"
          : null;

    const submission = await this.repository.save(
      this.repository.create({
        ...dto,
        website: undefined,
        passedTimeCheck: undefined,
        isBot,
        botReason,
        ipAddress: ipAddress ?? null
      } as Partial<ContactSubmission>)
    );

    if (!isBot) {
      await this.sendNotification(submission);
    }

    return submission;
  }

  findAll() {
    return this.repository.find({ order: { submittedAt: "DESC" } });
  }

  async markReviewed(id: string) {
    await this.repository.update({ id }, { reviewed: true });
    return this.repository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.repository.delete(id);
    return { success: true };
  }

  async exportCsv() {
    const rows = await this.findAll();
    const header = "Name,Phone,Email,Subject,SubmittedAt,IsBot,Reviewed";
    const body = rows.map((row) =>
      [
        row.fullName,
        row.phone,
        row.email,
        row.subject ?? "",
        row.submittedAt.toISOString(),
        row.isBot,
        row.reviewed
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );
    return [header, ...body].join("\n");
  }

  async stats() {
    const rows = await this.findAll();
    return {
      totalReceived: rows.length,
      botBlocked: rows.filter((row) => row.isBot).length,
      reviewed: rows.filter((row) => row.reviewed).length,
      unreviewed: rows.filter((row) => !row.reviewed).length
    };
  }

  private async sendNotification(submission: ContactSubmission) {
    const host = this.configService.get<string>("email.host");
    const port = this.configService.get<number>("email.port");
    const user = this.configService.get<string>("email.user");
    const pass = this.configService.get<string>("email.pass");
    if (!host || !user || !pass) {
      return;
    }

    const transport = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass }
    });

    await transport.sendMail({
      from: user,
      to: this.configService.get<string>("email.recipient"),
      subject: `Altmed contact form: ${submission.subject ?? "General Inquiry"}`,
      text: `${submission.fullName}\n${submission.email}\n${submission.phone}\n\n${submission.message}`
    });
  }
}
