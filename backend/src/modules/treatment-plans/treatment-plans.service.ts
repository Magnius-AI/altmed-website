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
import { PlanEnrollment, StripeSettings, TreatmentPlan } from "../../database/entities";
import {
  CreateCheckoutDto,
  CreateTreatmentPlanDto,
  UpdateEnrollmentDto,
  UpdateStripeSettingsDto,
  UpdateTreatmentPlanDto
} from "./dto";

const PAID_STATUSES = ["paid", "active", "completed"];

@Injectable()
export class TreatmentPlansService {
  private readonly logger = new Logger(TreatmentPlansService.name);

  constructor(
    @InjectRepository(TreatmentPlan) private readonly plans: Repository<TreatmentPlan>,
    @InjectRepository(PlanEnrollment) private readonly enrollments: Repository<PlanEnrollment>,
    @InjectRepository(StripeSettings) private readonly settings: Repository<StripeSettings>,
    private readonly configService: ConfigService
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
      where.status = filters.status;
    }
    const rows = await this.enrollments.find({ where, order: { createdAt: "DESC" } });
    const planIds = Array.from(new Set(rows.map((row) => row.planId)));
    const plans = planIds.length ? await this.plans.find({ where: { id: In(planIds) } }) : [];
    const planMap = new Map(plans.map((plan) => [plan.id, plan]));
    return rows.map((row) => ({ ...row, plan: planMap.get(row.planId) ?? null }));
  }

  async updateEnrollment(id: string, dto: UpdateEnrollmentDto) {
    const enrollment = await this.enrollments.findOne({ where: { id } });
    if (!enrollment) {
      throw new NotFoundException("Enrollment not found");
    }
    Object.assign(enrollment, {
      status: dto.status ?? enrollment.status,
      notes: dto.notes !== undefined ? dto.notes.trim() || null : enrollment.notes
    });
    return this.enrollments.save(enrollment);
  }

  async metrics() {
    const [activePlans, totalEnrolled, activeMembers, paidEnrollments] = await Promise.all([
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
        .getMany()
    ]);

    return {
      activePlans,
      totalEnrolled,
      activeMembers,
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
        status: "pending"
      })
    );

    const baseUrl = this.configService.get<string>("payments.baseUrl") ?? "http://localhost:3000";
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
        settings?.stripeWebhookEndpointUrl ?? `${this.configService.get<string>("payments.baseUrl") ?? "http://localhost:3000"}/api/webhooks/stripe`,
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
    await this.enrollments.update(
      { id: enrollmentId },
      {
        status: "paid",
        stripePaymentIntent:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null,
        amountPaidCents: session.amount_total ?? plan.priceCents,
        enrolledAt: now,
        startsAt: now,
        endsAt: plan.durationDays ? endsAt : null
      }
    );

    if (!enrollment.confirmationEmailSentAt) {
      await this.sendPaymentConfirmation(
        {
          ...enrollment,
          status: "paid",
          amountPaidCents: session.amount_total ?? plan.priceCents,
          enrolledAt: now,
          startsAt: now,
          endsAt: plan.durationDays ? endsAt : null
        },
        plan
      );
    }
  }

  private async sendPaymentConfirmation(enrollment: PlanEnrollment, plan: TreatmentPlan) {
    const host = this.configService.get<string>("email.host");
    const port = this.configService.get<number>("email.port");
    const user = this.configService.get<string>("email.user");
    const pass = this.configService.get<string>("email.pass");
    if (!host || !user || !pass) {
      return;
    }

    const amount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: plan.currency.toUpperCase()
    }).format((enrollment.amountPaidCents ?? plan.priceCents) / 100);
    const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });
    const enrolledDate = enrollment.enrolledAt ? dateFormatter.format(enrollment.enrolledAt) : dateFormatter.format(new Date());
    const endDate = enrollment.endsAt ? dateFormatter.format(enrollment.endsAt) : null;
    const baseUrl = this.configService.get<string>("payments.baseUrl") ?? "http://localhost:3000";

    const transport = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass }
    });

    try {
      await transport.sendMail({
        from: user,
        to: enrollment.patientEmail,
        bcc: this.configService.get<string>("email.recipient"),
        subject: `Altmed plan confirmation: ${plan.name}`,
        text: [
          `Hi ${enrollment.patientName ?? "there"},`,
          "",
          `Your payment for ${plan.name} was received.`,
          `Amount charged: ${amount}`,
          `Enrollment date: ${enrolledDate}`,
          endDate ? `Plan valid through: ${endDate}` : "",
          "",
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
            <h2 style="margin:0 0 12px">Your Altmed plan payment was received</h2>
            <p>Hi ${enrollment.patientName ?? "there"},</p>
            <p>Your payment for <strong>${plan.name}</strong> was received.</p>
            <table style="border-collapse:collapse;margin:18px 0">
              <tr><td style="padding:6px 16px 6px 0;color:#526679">Amount charged</td><td style="padding:6px 0;font-weight:700">${amount}</td></tr>
              <tr><td style="padding:6px 16px 6px 0;color:#526679">Enrollment date</td><td style="padding:6px 0">${enrolledDate}</td></tr>
              ${
                endDate
                  ? `<tr><td style="padding:6px 16px 6px 0;color:#526679">Plan valid through</td><td style="padding:6px 0">${endDate}</td></tr>`
                  : ""
              }
            </table>
            <p>Our clinic team will contact you with the next steps. You can also call us at <strong>(703) 361-4357</strong>.</p>
            <p><a href="${baseUrl}/plans/${plan.slug}" style="color:#229653;font-weight:700">View plan details</a></p>
            <p>Altmed Medical Center</p>
          </div>
        `
      });
      await this.enrollments.update({ id: enrollment.id }, { confirmationEmailSentAt: new Date() });
    } catch (error) {
      this.logger.warn(
        `Payment confirmation email failed for enrollment ${enrollment.id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
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
