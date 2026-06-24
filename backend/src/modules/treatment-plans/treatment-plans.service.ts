import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import nodemailer from "nodemailer";
import Stripe = require("stripe");
import { In, Repository } from "typeorm";
import { PlanAttendance, PlanEnrollment, StripeSettings, TreatmentPlan } from "../../database/entities";
import { SiteSettingsService } from "../site-settings/site-settings.service";
import {
  CreateCheckoutDto,
  CreateEnrollmentDto,
  RecordAttendanceDto,
  CreateTreatmentPlanDto,
  UpdateEnrollmentDto,
  UpdateStripeSettingsDto,
  UpdateTreatmentPlanDto
} from "./dto";

const PAID_STATUSES = ["paid", "active", "completed"];
const UNPAID_STATUSES = ["pending", "failed"];
const ACTIVE_ATTENDANCE_STATUSES = ["paid", "active"];

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
export class TreatmentPlansService {
  private readonly logger = new Logger(TreatmentPlansService.name);

  constructor(
    @InjectRepository(TreatmentPlan) private readonly plans: Repository<TreatmentPlan>,
    @InjectRepository(PlanEnrollment) private readonly enrollments: Repository<PlanEnrollment>,
    @InjectRepository(PlanAttendance) private readonly attendance: Repository<PlanAttendance>,
    @InjectRepository(StripeSettings) private readonly settings: Repository<StripeSettings>,
    private readonly configService: ConfigService,
    private readonly siteSettingsService: SiteSettingsService
  ) {}

  async findPublic() {
    return this.plans.find({ where: { isActive: true }, order: { priceCents: "ASC", name: "ASC" } });
  }

  async findAdmin() {
    const plans = await this.plans.find({ order: { updatedAt: "DESC" } });
    const summaries = await Promise.all(plans.map((plan) => this.planSummary(plan.id)));
    const summaryMap = new Map(summaries.map((summary) => [summary.planId, summary]));
    return plans.map((plan) => ({ ...plan, summary: summaryMap.get(plan.id) }));
  }

  async findBySlug(slug: string) {
    const plan = await this.plans.findOne({ where: { slug, isActive: true } });
    if (!plan) {
      throw new NotFoundException("Treatment plan not found");
    }
    return plan;
  }

  async findById(id: string) {
    const plan = await this.plans.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException("Treatment plan not found");
    }
    return plan;
  }

  async create(dto: CreateTreatmentPlanDto) {
    const plan = await this.plans.save(
      this.plans.create({
        ...dto,
        name: dto.name.trim(),
        slug: this.slugify(dto.slug || dto.name),
        category: dto.category?.trim() || null,
        description: dto.description?.trim() || null,
        durationLabel: dto.durationLabel?.trim() || null,
        currency: (dto.currency || "usd").toLowerCase(),
        checklist: this.normalizeChecklist(dto.checklist),
        isActive: dto.isActive ?? true
      })
    );

    return this.syncStripePrice(plan);
  }

  async update(id: string, dto: UpdateTreatmentPlanDto) {
    const plan = await this.findById(id);
    Object.assign(plan, {
      ...dto,
      name: dto.name?.trim() ?? plan.name,
      slug: dto.slug ? this.slugify(dto.slug) : plan.slug,
      category: dto.category !== undefined ? dto.category.trim() || null : plan.category,
      description: dto.description !== undefined ? dto.description.trim() || null : plan.description,
      durationLabel: dto.durationLabel !== undefined ? dto.durationLabel.trim() || null : plan.durationLabel,
      currency: dto.currency ? dto.currency.toLowerCase() : plan.currency,
      checklist: dto.checklist !== undefined ? this.normalizeChecklist(dto.checklist) : plan.checklist,
      isActive: dto.isActive ?? plan.isActive
    });
    const saved = await this.plans.save(plan);
    return this.syncStripePrice(saved);
  }

  async remove(id: string) {
    await this.plans.delete(id);
    return { success: true };
  }

  async findEnrollments(filters: { planId?: string; status?: string } = {}) {
    const where: Record<string, unknown> = {};
    if (filters.planId) {
      where.planId = filters.planId;
    }
    if (filters.status && filters.status !== "all") {
      if (filters.status === "paid") {
        where.status = In(PAID_STATUSES);
      } else if (filters.status === "unpaid") {
        where.status = In(UNPAID_STATUSES);
      } else {
        where.status = filters.status;
      }
    }
    const rows = await this.enrollments.find({ where, order: { createdAt: "DESC" } });
    const codedRows = await Promise.all(rows.map((row) => this.ensureEnrollmentCode(row)));
    const planIds = Array.from(new Set(codedRows.map((row) => row.planId)));
    const plans = planIds.length ? await this.plans.find({ where: { id: In(planIds) } }) : [];
    const planMap = new Map(plans.map((plan) => [plan.id, plan]));
    return codedRows.map((row) => ({ ...row, plan: planMap.get(row.planId) ?? null }));
  }

  async createEnrollment(dto: CreateEnrollmentDto) {
    const plan = await this.findById(dto.planId);
    const status = dto.status ?? "active";
    const startsAt = this.parseOptionalDate(dto.startsAt) ?? (PAID_STATUSES.includes(status) ? new Date() : null);
    const endsAt =
      this.parseOptionalDate(dto.endsAt) ??
      (startsAt && plan.durationDays ? new Date(startsAt.getTime() + plan.durationDays * 86_400_000) : null);

    const enrollment = await this.enrollments.save(
      this.enrollments.create({
        planId: plan.id,
        patientName: dto.patientName?.trim() || null,
        patientEmail: dto.patientEmail.trim().toLowerCase(),
        patientPhone: dto.patientPhone?.trim() || null,
        enrollmentCode: await this.createUniqueEnrollmentCode(),
        status,
        amountPaidCents: dto.amountPaidCents ?? (PAID_STATUSES.includes(status) ? plan.priceCents : 0),
        paymentMethod: dto.paymentMethod?.trim() || null,
        enrolledAt: PAID_STATUSES.includes(status) ? new Date() : null,
        startsAt,
        endsAt,
        visitCount: dto.visitCount ?? 0,
        lastVisitAt: this.parseOptionalDate(dto.lastVisitAt),
        nextVisitAt: this.parseOptionalDate(dto.nextVisitAt),
        notes: dto.notes?.trim() || null
      })
    );

    if (PAID_STATUSES.includes(status)) {
      await this.sendEnrollmentEmails(enrollment, plan, "manual");
    }

    return enrollment;
  }

  async updateEnrollment(id: string, dto: UpdateEnrollmentDto) {
    const enrollment = await this.enrollments.findOne({ where: { id } });
    if (!enrollment) {
      throw new NotFoundException("Enrollment not found");
    }
    const nextStatus = dto.status ?? enrollment.status;
    const plan = PAID_STATUSES.includes(nextStatus) ? await this.findById(enrollment.planId) : null;
    Object.assign(enrollment, {
      status: nextStatus,
      patientName: dto.patientName !== undefined ? dto.patientName.trim() || null : enrollment.patientName,
      patientPhone: dto.patientPhone !== undefined ? dto.patientPhone.trim() || null : enrollment.patientPhone,
      enrollmentCode: enrollment.enrollmentCode ?? (await this.createUniqueEnrollmentCode()),
      amountPaidCents: dto.amountPaidCents ?? enrollment.amountPaidCents ?? (plan ? plan.priceCents : null),
      paymentMethod: dto.paymentMethod !== undefined ? dto.paymentMethod.trim() || null : enrollment.paymentMethod,
      startsAt: dto.startsAt !== undefined ? this.parseOptionalDate(dto.startsAt) : enrollment.startsAt,
      endsAt: dto.endsAt !== undefined ? this.parseOptionalDate(dto.endsAt) : enrollment.endsAt,
      visitCount: dto.visitCount ?? enrollment.visitCount,
      lastVisitAt: dto.lastVisitAt !== undefined ? this.parseOptionalDate(dto.lastVisitAt) : enrollment.lastVisitAt,
      nextVisitAt: dto.nextVisitAt !== undefined ? this.parseOptionalDate(dto.nextVisitAt) : enrollment.nextVisitAt,
      notes: dto.notes !== undefined ? dto.notes.trim() || null : enrollment.notes
    });
    if (!enrollment.enrolledAt && PAID_STATUSES.includes(nextStatus)) {
      enrollment.enrolledAt = new Date();
    }
    if (plan && !enrollment.startsAt) {
      enrollment.startsAt = enrollment.enrolledAt ?? new Date();
    }
    if (plan && !enrollment.endsAt && enrollment.startsAt && plan.durationDays) {
      enrollment.endsAt = new Date(enrollment.startsAt.getTime() + plan.durationDays * 86_400_000);
    }

    const shouldSendWelcome = Boolean(plan && !enrollment.confirmationEmailSentAt && PAID_STATUSES.includes(nextStatus));
    const saved = await this.enrollments.save(enrollment);
    if (plan && shouldSendWelcome) {
      await this.sendEnrollmentEmails(saved, plan, "status_update");
    }
    return saved;
  }

  async removeEnrollment(id: string) {
    const enrollment = await this.enrollments.findOne({ where: { id } });
    if (!enrollment) {
      throw new NotFoundException("Enrollment not found");
    }
    await this.attendance.delete({ enrollmentId: id });
    await this.enrollments.delete({ id });
    return { success: true };
  }

  async findAttendance(filters: { code?: string } = {}) {
    const where: Record<string, unknown> = {};
    const code = this.normalizeEnrollmentCode(filters.code);
    if (code) {
      where.enrollmentCode = code;
    }

    const rows = await this.attendance.find({
      where,
      order: { visitedAt: "DESC", createdAt: "DESC" },
      take: 100
    });
    const enrollmentIds = Array.from(new Set(rows.map((row) => row.enrollmentId)));
    const enrollments = enrollmentIds.length ? await this.enrollments.find({ where: { id: In(enrollmentIds) } }) : [];
    const codedEnrollments = await Promise.all(enrollments.map((enrollment) => this.ensureEnrollmentCode(enrollment)));
    const planIds = Array.from(new Set(codedEnrollments.map((enrollment) => enrollment.planId)));
    const plans = planIds.length ? await this.plans.find({ where: { id: In(planIds) } }) : [];
    const planMap = new Map(plans.map((plan) => [plan.id, plan]));
    const enrollmentMap = new Map(codedEnrollments.map((enrollment) => [enrollment.id, enrollment]));

    return rows.map((row) => {
      const enrollment = enrollmentMap.get(row.enrollmentId) ?? null;
      return {
        ...row,
        enrollment: enrollment ? { ...enrollment, plan: planMap.get(enrollment.planId) ?? null } : null
      };
    });
  }

  async recordAttendance(dto: RecordAttendanceDto) {
    const code = this.normalizeEnrollmentCode(dto.enrollmentCode);
    if (!code) {
      throw new BadRequestException("Enter an enrollment code");
    }
    if (!/^AM-[A-F0-9]{4}-[A-F0-9]{4}$/.test(code)) {
      throw new BadRequestException("Enrollment code must look like AM-1234-ABCD");
    }

    const enrollment = await this.enrollments.findOne({ where: { enrollmentCode: code } });
    if (!enrollment) {
      throw new NotFoundException("No enrollment found for that code");
    }
    if (!ACTIVE_ATTENDANCE_STATUSES.includes(enrollment.status)) {
      throw new BadRequestException("Payment must be paid or active before recording attendance");
    }

    const codedEnrollment = await this.ensureEnrollmentCode(enrollment);
    const visitedAt = this.parseOptionalDate(dto.visitedAt) ?? new Date();
    const tomorrow = new Date(Date.now() + 36 * 60 * 60 * 1000);
    if (visitedAt.getTime() > tomorrow.getTime()) {
      throw new BadRequestException("Visit date is too far in the future");
    }
    const attendance = await this.attendance.save(
      this.attendance.create({
        enrollmentId: codedEnrollment.id,
        enrollmentCode: codedEnrollment.enrollmentCode ?? code,
        visitedAt,
        staffName: dto.staffName?.trim() || null,
        notes: dto.notes?.trim() || null
      })
    );

    codedEnrollment.visitCount = (codedEnrollment.visitCount ?? 0) + 1;
    codedEnrollment.lastVisitAt = visitedAt;
    await this.enrollments.save(codedEnrollment);

    const plan = await this.findById(codedEnrollment.planId);
    return {
      attendance,
      enrollment: { ...codedEnrollment, plan },
      paymentStatus: PAID_STATUSES.includes(codedEnrollment.status) ? "paid" : "unpaid"
    };
  }

  async metrics() {
    const weekFromNow = new Date(Date.now() + 7 * 86_400_000);
    const [activePlans, totalEnrolled, activeMembers, paidEnrollments, pendingEnrollments, followUpsDue, visitsThisMonth] = await Promise.all([
      this.plans.count({ where: { isActive: true } }),
      this.enrollments.count({ where: { status: In(PAID_STATUSES) } }),
      this.enrollments
        .createQueryBuilder("enrollment")
        .where("enrollment.status = :status", { status: "active" })
        .andWhere("enrollment.endsAt > :now", { now: new Date() })
        .getCount(),
      this.enrollments
        .createQueryBuilder("enrollment")
        .where("enrollment.status IN (:...statuses)", { statuses: PAID_STATUSES })
        .andWhere("enrollment.enrolledAt >= :monthStart", { monthStart: this.monthStart() })
        .getMany(),
      this.enrollments.count({ where: { status: "pending" } }),
      this.enrollments
        .createQueryBuilder("enrollment")
        .where("enrollment.status IN (:...statuses)", { statuses: ACTIVE_ATTENDANCE_STATUSES })
        .andWhere("enrollment.nextVisitAt IS NOT NULL")
        .andWhere("enrollment.nextVisitAt <= :weekFromNow", { weekFromNow })
        .getCount(),
      this.attendance
        .createQueryBuilder("attendance")
        .where("attendance.visitedAt >= :monthStart", { monthStart: this.monthStart() })
        .getCount()
    ]);

    return {
      activePlans,
      totalEnrolled,
      activeMembers,
      pendingEnrollments,
      followUpsDue,
      visitsThisMonth,
      revenueMtdCents: paidEnrollments.reduce((sum, item) => sum + (item.amountPaidCents ?? 0), 0)
    };
  }

  async createCheckout(slug: string, dto: CreateCheckoutDto) {
    const plan = await this.findBySlug(slug);
    const stripe = await this.getStripe();

    if (!stripe) {
      throw new BadRequestException("Stripe is not configured yet");
    }

    const enrollment = await this.enrollments.save(
      this.enrollments.create({
        planId: plan.id,
        patientName: dto.name.trim(),
        patientEmail: dto.email.trim().toLowerCase(),
        patientPhone: dto.phone?.trim() || null,
        enrollmentCode: await this.createUniqueEnrollmentCode(),
        status: "pending"
      })
    );

    const baseUrl = this.configService.get<string>("payments.baseUrl") ?? "https://altmedfirst.com";
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: enrollment.patientEmail,
        line_items: [
          {
            price_data: {
              currency: plan.currency,
              unit_amount: plan.priceCents,
              product_data: {
                name: plan.name,
                description: plan.description ?? undefined
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          enrollment_id: enrollment.id,
          enrollment_code: enrollment.enrollmentCode ?? "",
          plan_id: plan.id,
          patient_name: enrollment.patientName ?? "",
          patient_phone: enrollment.patientPhone ?? ""
        },
        success_url: `${baseUrl}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/plans/${plan.slug}`
      });

      if (!session.url) {
        throw new BadRequestException("Stripe did not return a checkout URL");
      }

      enrollment.stripeSessionId = session.id;
      await this.enrollments.save(enrollment);
      return { url: session.url };
    } catch (error) {
      await this.enrollments.update({ id: enrollment.id }, { status: "failed" });
      if (error instanceof BadRequestException) {
        throw error;
      }

      const message = error instanceof Error ? error.message : "Unknown Stripe checkout error";
      this.logger.error(`Stripe checkout failed for plan ${plan.id}: ${message}`);
      throw new BadRequestException(`Stripe checkout failed: ${message}`);
    }
  }

  async handleStripeWebhook(signature: string | undefined, rawBody: Buffer | undefined) {
    const stripe = await this.getStripe();
    const settings = await this.getSettings();
    const webhookSecret = settings?.stripeWebhookSecretEnc
      ? this.decrypt(settings.stripeWebhookSecretEnc)
      : "";

    if (!stripe || !webhookSecret || !signature || !rawBody) {
      throw new BadRequestException("Stripe webhook is not configured");
    }

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      throw new BadRequestException(
        `Webhook signature failed${error instanceof Error ? `: ${error.message}` : ""}`
      );
    }

    if (event.type === "checkout.session.completed") {
      await this.markCheckoutPaid(event.data.object);
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as { id: string };
      await this.enrollments.update({ stripePaymentIntent: paymentIntent.id }, { status: "failed" });
    }

    if (event.type === "charge.refunded") {
      const charge = event.data.object as { payment_intent?: string | { id?: string } | null };
      const paymentIntent =
        typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
      if (paymentIntent) {
        await this.enrollments.update({ stripePaymentIntent: paymentIntent }, { status: "refunded" });
      }
    }

    return { received: true };
  }

  async getMaskedSettings() {
    const settings = await this.getSettings();
    return {
      stripePublishableKey: settings?.stripePublishableKey ?? "",
      stripeSecretKeyLast4: this.maskSecretLast4(settings?.stripeSecretKeyEnc),
      stripeWebhookSecretLast4: this.maskSecretLast4(settings?.stripeWebhookSecretEnc),
      stripeWebhookEndpointUrl:
        settings?.stripeWebhookEndpointUrl ?? `${this.configService.get<string>("payments.baseUrl") ?? "https://altmedfirst.com"}/api/webhooks/stripe`,
      isLiveMode: settings?.isLiveMode ?? false
    };
  }

  async updateSettings(dto: UpdateStripeSettingsDto) {
    const settings = (await this.getSettings()) ?? this.settings.create();
    settings.stripePublishableKey = dto.stripePublishableKey?.trim() || settings.stripePublishableKey;
    settings.stripeSecretKeyEnc = dto.stripeSecretKey?.trim()
      ? this.encrypt(dto.stripeSecretKey.trim())
      : settings.stripeSecretKeyEnc;
    settings.stripeWebhookSecretEnc = dto.stripeWebhookSecret?.trim()
      ? this.encrypt(dto.stripeWebhookSecret.trim())
      : settings.stripeWebhookSecretEnc;
    settings.stripeWebhookEndpointUrl =
      dto.stripeWebhookEndpointUrl !== undefined
        ? dto.stripeWebhookEndpointUrl.trim() || null
        : settings.stripeWebhookEndpointUrl;
    settings.isLiveMode = dto.isLiveMode ?? settings.isLiveMode ?? false;
    await this.settings.save(settings);
    return this.getMaskedSettings();
  }

  async testStripeConnection(secretKey?: string) {
    const stripe = secretKey?.trim() ? new Stripe(secretKey.trim()) : await this.getStripe();
    if (!stripe) {
      throw new BadRequestException("Stripe secret key is not configured");
    }
    const account = await stripe.accounts.retrieve(null);
    return {
      success: true,
      accountName: account.settings?.dashboard?.display_name ?? account.business_profile?.name ?? account.id
    };
  }

  private async markCheckoutPaid(session: {
    metadata?: Record<string, string> | null;
    payment_intent?: string | { id?: string } | null;
    amount_total?: number | null;
  }) {
    const enrollmentId = session.metadata?.enrollment_id;
    const planId = session.metadata?.plan_id;
    if (!enrollmentId || !planId) {
      return;
    }

    const plan = await this.findById(planId);
    const enrollment = await this.enrollments.findOne({ where: { id: enrollmentId } });
    if (!enrollment) {
      return;
    }

    const now = new Date();
    const endsAt = new Date(now.getTime() + (plan.durationDays ?? 0) * 86_400_000);
    const enrollmentCode = enrollment.enrollmentCode ?? (await this.createUniqueEnrollmentCode());
    await this.enrollments.update(
      { id: enrollmentId },
      {
        status: "paid",
        enrollmentCode,
        stripePaymentIntent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null,
        amountPaidCents: session.amount_total ?? plan.priceCents,
        paymentMethod: "Stripe",
        enrolledAt: now,
        startsAt: now,
        endsAt: plan.durationDays ? endsAt : null
      }
    );

    if (!enrollment.confirmationEmailSentAt) {
      await this.sendEnrollmentEmails(
        {
          ...enrollment,
          status: "paid",
          enrollmentCode,
          amountPaidCents: session.amount_total ?? plan.priceCents,
          paymentMethod: "Stripe",
          enrolledAt: now,
          startsAt: now,
          endsAt: plan.durationDays ? endsAt : null
        },
        plan,
        "stripe"
      );
    }
  }

  private async sendEnrollmentEmails(enrollment: PlanEnrollment, plan: TreatmentPlan, source: "manual" | "status_update" | "stripe") {
    const mailer = await this.getMailer();
    if (!mailer) {
      return;
    }
    try {
      const amount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: (plan.currency || "usd").toUpperCase()
      }).format((enrollment.amountPaidCents ?? plan.priceCents) / 100);
      const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });
      const enrolledDate = enrollment.enrolledAt ? dateFormatter.format(enrollment.enrolledAt) : dateFormatter.format(new Date());
      const endDate = enrollment.endsAt ? dateFormatter.format(enrollment.endsAt) : null;
      const baseUrl = this.configService.get<string>("payments.baseUrl") ?? "https://altmedfirst.com";
      const enrollmentCode = enrollment.enrollmentCode ?? enrollment.id;
      const patientName = enrollment.patientName ?? "there";
      const paymentStatus = PAID_STATUSES.includes(enrollment.status) ? "Paid/active" : enrollment.status;
      const adminSubject =
        source === "stripe"
          ? `Paid treatment plan enrollment: ${enrollmentCode}`
          : `Treatment plan enrollment added: ${enrollmentCode}`;

      await mailer.transport.sendMail({
        from: mailer.from,
        to: enrollment.patientEmail,
        subject: `Welcome to your Altmed plan: ${plan.name}`,
        text: [
          `Hi ${enrollment.patientName ?? "there"},`,
          "",
          `Welcome to ${plan.name} at Altmed Medical Center.`,
          `Enrollment ID: ${enrollmentCode}`,
          `Payment status: ${PAID_STATUSES.includes(enrollment.status) ? "Paid/active" : enrollment.status}`,
          `Amount recorded: ${amount}`,
          `Enrollment date: ${enrolledDate}`,
          endDate ? `Plan valid through: ${endDate}` : "",
          "",
          "Please keep this Enrollment ID. Our front desk can use it to check attendance for your treatment-plan visits.",
          "Our clinic team will contact you with the next steps. You can also call us at (703) 361-4357.",
          "",
          `Plan page: ${baseUrl}/plans/${plan.slug}`,
          "",
          "Altmed Medical Center"
        ]
          .filter(Boolean)
          .join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;color:#12344d;line-height:1.6">
            <h2 style="margin:0 0 12px">Welcome to your Altmed treatment plan</h2>
            <p>Hi ${escapeHtml(patientName)},</p>
            <p>Your enrollment for <strong>${escapeHtml(plan.name)}</strong> has been recorded.</p>
            <p style="font-size:20px;font-weight:700;letter-spacing:0.08em;color:#0f5f4c;margin:16px 0">Enrollment ID: ${escapeHtml(enrollmentCode)}</p>
            <table style="border-collapse:collapse;margin:18px 0">
              <tr><td style="padding:6px 16px 6px 0;color:#526679">Payment status</td><td style="padding:6px 0;font-weight:700">${escapeHtml(paymentStatus)}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#526679">Amount recorded</td><td style="padding:6px 0;font-weight:700">${escapeHtml(amount)}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#526679">Enrollment date</td><td style="padding:6px 0">${escapeHtml(enrolledDate)}</td></tr>
              ${
                endDate
                  ? `<tr><td style="padding:6px 16px 6px 0;color:#526679">Plan valid through</td><td style="padding:6px 0">${escapeHtml(endDate)}</td></tr>`
                  : ""
              }
            </table>
            <p>Please keep this Enrollment ID. Our front desk can use it to check attendance for your treatment-plan visits.</p>
            <p>Our clinic team will contact you with the next steps. You can also call us at <strong>(703) 361-4357</strong>.</p>
            <p><a href="${baseUrl}/plans/${plan.slug}" style="color:#229653;font-weight:700">View plan details</a></p>
            <p>Altmed Medical Center</p>
          </div>
        `
      });

      await mailer.transport.sendMail({
        from: mailer.from,
        to: mailer.adminRecipient,
        replyTo: enrollment.patientEmail,
        subject: adminSubject,
        text: [
          `Enrollment ID: ${enrollmentCode}`,
          `Patient: ${enrollment.patientName ?? "Patient"}`,
          `Email: ${enrollment.patientEmail}`,
          `Phone: ${enrollment.patientPhone ?? "Not provided"}`,
          `Plan: ${plan.name}`,
          `Status: ${enrollment.status}`,
          `Amount recorded: ${amount}`,
          `Payment method: ${enrollment.paymentMethod ?? "Not set"}`,
          `Enrollment date: ${enrolledDate}`,
          endDate ? `Plan valid through: ${endDate}` : "",
          "",
          `Admin attendance: ${baseUrl}/admin/treatment-plans/attendance?code=${encodeURIComponent(enrollmentCode)}`
        ]
          .filter(Boolean)
          .join("\n")
      });

      await this.enrollments.update({ id: enrollment.id }, { confirmationEmailSentAt: new Date() });
    } catch (error) {
      this.logger.warn(
        `Enrollment email failed for enrollment ${enrollment.id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  private async getMailer() {
    const siteSetting = await this.siteSettingsService.findByKey("smtp");
    const smtpSettings = (siteSetting?.value ?? {}) as SmtpSettingValue;
    const hasAdminSettings = Object.keys(smtpSettings).length > 0;
    const enabled = hasAdminSettings ? smtpSettings.enabled === true : true;
    const host = asString(smtpSettings.host) || this.configService.get<string>("email.host");
    const port = asNumber(smtpSettings.port, this.configService.get<number>("email.port") ?? 587);
    const user = asString(smtpSettings.username) || this.configService.get<string>("email.user");
    const pass = asString(smtpSettings.password) || this.configService.get<string>("email.pass");
    const adminRecipient =
      asString(smtpSettings.recipientEmail) ||
      this.configService.get<string>("email.recipient") ||
      user;

    if (!enabled || !host || !user || !pass || !adminRecipient) {
      return null;
    }

    const fromEmail = asString(smtpSettings.fromEmail) || user;
    const fromName = asString(smtpSettings.fromName) || "Altmed Medical Center";
    const secure = typeof smtpSettings.secure === "boolean" ? smtpSettings.secure : port === 465;

    return {
      transport: nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass }
      }),
      from: `${fromName} <${fromEmail}>`,
      adminRecipient
    };
  }

  private async ensureEnrollmentCode(enrollment: PlanEnrollment) {
    if (enrollment.enrollmentCode) {
      return enrollment;
    }
    enrollment.enrollmentCode = await this.createUniqueEnrollmentCode();
    return this.enrollments.save(enrollment);
  }

  private async createUniqueEnrollmentCode() {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const token = randomBytes(4).toString("hex").toUpperCase();
      const code = `AM-${token.slice(0, 4)}-${token.slice(4)}`;
      const existing = await this.enrollments.findOne({ where: { enrollmentCode: code } });
      if (!existing) {
        return code;
      }
    }
    throw new InternalServerErrorException("Could not create a unique enrollment code");
  }

  private normalizeEnrollmentCode(value?: string | null) {
    return value?.trim().toUpperCase().replace(/\s+/g, "") || "";
  }

  private async syncStripePrice(plan: TreatmentPlan) {
    const stripe = await this.getStripe();
    if (!stripe || plan.stripePriceId) {
      return plan;
    }

    try {
      const product = await stripe.products.create({
        name: plan.name,
        description: plan.description ?? undefined,
        metadata: { plan_id: plan.id }
      });
      const price = await stripe.prices.create({
        unit_amount: plan.priceCents,
        currency: plan.currency,
        product: product.id,
        metadata: { plan_id: plan.id }
      });
      plan.stripePriceId = price.id;
      return this.plans.save(plan);
    } catch (error) {
      throw new InternalServerErrorException(
        `Stripe plan sync failed${error instanceof Error ? `: ${error.message}` : ""}`
      );
    }
  }

  private async getStripe() {
    const settings = await this.getSettings();
    const encrypted = settings?.stripeSecretKeyEnc;
    if (!encrypted) {
      return null;
    }
    try {
      return new Stripe(this.decrypt(encrypted));
    } catch (error) {
      this.logger.error(
        `Saved Stripe secret key could not be decrypted: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      throw new BadRequestException("Saved Stripe secret key could not be read. Re-save the Stripe secret key.");
    }
  }

  private async getSettings() {
    const [settings] = await this.settings.find({ order: { updatedAt: "DESC" }, take: 1 });
    return settings ?? null;
  }

  private maskSecretLast4(encrypted?: string | null) {
    if (!encrypted) {
      return "";
    }

    try {
      return this.decrypt(encrypted).slice(-4);
    } catch (error) {
      this.logger.warn(
        `Saved Stripe setting could not be decrypted for display: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      return "";
    }
  }

  private async planSummary(planId: string) {
    const rows = await this.enrollments.find({ where: { planId, status: In(PAID_STATUSES) } });
    return {
      planId,
      enrollmentCount: rows.length,
      revenueCents: rows.reduce((sum, row) => sum + (row.amountPaidCents ?? 0), 0)
    };
  }

  private normalizeChecklist(items?: string[]) {
    return (items ?? []).map((item) => item.trim()).filter(Boolean);
  }

  private parseOptionalDate(value?: string | null) {
    if (!value) {
      return null;
    }
    const trimmed = value.trim();
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? new Date(`${trimmed}T12:00:00`) : new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  private monthStart() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  private encryptionKey() {
    return createHash("sha256")
      .update(this.configService.get<string>("payments.encryptionKey") ?? "dev_payment_key_change_in_prod")
      .digest();
  }

  private encrypt(value: string) {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", this.encryptionKey(), iv);
    const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
  }

  private decrypt(payload: string) {
    const [ivValue, tagValue, encryptedValue] = payload.split(":");
    const decipher = createDecipheriv("aes-256-gcm", this.encryptionKey(), Buffer.from(ivValue, "base64"));
    decipher.setAuthTag(Buffer.from(tagValue, "base64"));
    return Buffer.concat([
      decipher.update(Buffer.from(encryptedValue, "base64")),
      decipher.final()
    ]).toString("utf8");
  }
}
