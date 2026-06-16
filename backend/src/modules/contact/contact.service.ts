import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { ContactSubmission } from "../../database/entities";
import { SiteSettingsService } from "../site-settings/site-settings.service";
import { CreateContactSubmissionDto } from "./dto";

type SmtpSettingValue = {
  enabled?: boolean;
  host?: string;
  port?: number | string;
  secure?: boolean;
  username?: string;
  password?: string;
  fromEmail?: string;
  fromName?: string;
  recipientEmail?: string;
  replyToSender?: boolean;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectRepository(ContactSubmission)
    private readonly repository: Repository<ContactSubmission>,
    private readonly configService: ConfigService,
    private readonly siteSettingsService: SiteSettingsService
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

    const failedTimeCheck = dto.passedTimeCheck !== true;
    const lowRecaptchaScore =
      typeof dto.recaptchaScore === "number" && dto.recaptchaScore < 0.5;
    const isBot = Boolean(dto.website) || failedTimeCheck || lowRecaptchaScore;
    const botReason = dto.website
      ? "honeypot"
      : failedTimeCheck
        ? "submitted_too_fast"
        : lowRecaptchaScore
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
      await this.sendNotification(submission).catch((error: unknown) => {
        this.logger.error(
          `Contact notification failed for ${submission.id}`,
          error instanceof Error ? error.stack : String(error)
        );
      });
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
    const siteSetting = await this.siteSettingsService.findByKey("smtp");
    const smtpSettings = (siteSetting?.value ?? {}) as SmtpSettingValue;
    const hasAdminSettings = Object.keys(smtpSettings).length > 0;
    const enabled = hasAdminSettings ? smtpSettings.enabled === true : true;
    const host = asString(smtpSettings.host) || this.configService.get<string>("email.host");
    const port = asNumber(smtpSettings.port, this.configService.get<number>("email.port") ?? 587);
    const user = asString(smtpSettings.username) || this.configService.get<string>("email.user");
    const pass = asString(smtpSettings.password) || this.configService.get<string>("email.pass");
    const recipient =
      asString(smtpSettings.recipientEmail) ||
      this.configService.get<string>("email.recipient") ||
      user;

    if (!enabled || !host || !user || !pass || !recipient) {
      return;
    }

    const fromEmail = asString(smtpSettings.fromEmail) || user;
    const fromName = asString(smtpSettings.fromName) || "Altmed Medical Center";
    const secure =
      typeof smtpSettings.secure === "boolean" ? smtpSettings.secure : port === 465;

    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    await transport.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: recipient,
      replyTo: smtpSettings.replyToSender === false ? undefined : submission.email,
      subject: `Altmed contact form: ${submission.subject ?? "General Inquiry"}`,
      text: [
        `Name: ${submission.fullName}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        `Preferred contact: ${submission.preferredContactMethod ?? "Not specified"}`,
        `Subject: ${submission.subject ?? "General Inquiry"}`,
        "",
        submission.message
      ].join("\n")
    });
  }
}
