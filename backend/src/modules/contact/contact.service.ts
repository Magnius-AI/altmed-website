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

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    const frontendUrl = this.configService.get<string>("app.frontendUrl") ?? "https://altmedfirst.com";

    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    const subject = submission.subject ?? "General Inquiry";
    const preferredContact = submission.preferredContactMethod ?? "Not specified";

    await transport.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: recipient,
      replyTo: smtpSettings.replyToSender === false ? undefined : submission.email,
      subject: `Altmed contact form: ${subject}`,
      text: [
        `Submission ID: ${submission.id}`,
        `Name: ${submission.fullName}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        `Preferred contact: ${preferredContact}`,
        `Subject: ${subject}`,
        "",
        submission.message,
        "",
        `Admin inbox: ${frontendUrl}/admin/contact-submissions`
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#12344d;line-height:1.6">
          <h2 style="margin:0 0 12px">New Altmed contact form message</h2>
          <table style="border-collapse:collapse;margin:18px 0">
            <tr><td style="padding:6px 16px 6px 0;color:#526679">Submission ID</td><td style="padding:6px 0;font-weight:700">${escapeHtml(submission.id)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#526679">Name</td><td style="padding:6px 0">${escapeHtml(submission.fullName)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#526679">Email</td><td style="padding:6px 0">${escapeHtml(submission.email)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#526679">Phone</td><td style="padding:6px 0">${escapeHtml(submission.phone)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#526679">Preferred contact</td><td style="padding:6px 0">${escapeHtml(preferredContact)}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#526679">Subject</td><td style="padding:6px 0">${escapeHtml(subject)}</td></tr>
          </table>
          <p style="white-space:pre-wrap">${escapeHtml(submission.message)}</p>
          <p><a href="${frontendUrl}/admin/contact-submissions" style="color:#229653;font-weight:700">Open contact inbox</a></p>
        </div>
      `
    });
  }
}
