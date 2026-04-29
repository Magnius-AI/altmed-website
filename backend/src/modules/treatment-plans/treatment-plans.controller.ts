import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import {
  CreateCheckoutDto,
  CreateTreatmentPlanDto,
  UpdateEnrollmentDto,
  UpdateStripeSettingsDto,
  UpdateTreatmentPlanDto
} from "./dto";
import { TreatmentPlansService } from "./treatment-plans.service";

@Controller("treatment-plans")
export class TreatmentPlansController {
  constructor(private readonly treatmentPlansService: TreatmentPlansService) {}

  @Get()
  findPublic() {
    return this.treatmentPlansService.findPublic();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAdmin() {
    return this.treatmentPlansService.findAdmin();
  }

  @Get("admin/enrollments")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findEnrollments(@Query("planId") planId?: string, @Query("status") status?: string) {
    return this.treatmentPlansService.findEnrollments({ planId, status });
  }

  @Get("admin/metrics")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  metrics() {
    return this.treatmentPlansService.metrics();
  }

  @Get("admin/stripe-settings")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  settings() {
    return this.treatmentPlansService.getMaskedSettings();
  }

  @Patch("admin/stripe-settings")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  updateSettings(@Body() dto: UpdateStripeSettingsDto) {
    return this.treatmentPlansService.updateSettings(dto);
  }

  @Post("admin/stripe-settings/test")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  testConnection(@Body("stripeSecretKey") stripeSecretKey?: string) {
    return this.treatmentPlansService.testStripeConnection(stripeSecretKey);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  create(@Body() dto: CreateTreatmentPlanDto) {
    return this.treatmentPlansService.create(dto);
  }

  @Patch("admin/enrollments/:id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  updateEnrollment(@Param("id") id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.treatmentPlansService.updateEnrollment(id, dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() dto: UpdateTreatmentPlanDto) {
    return this.treatmentPlansService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.treatmentPlansService.remove(id);
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.treatmentPlansService.findBySlug(slug);
  }

  @Post("checkout/:slug")
  checkout(@Param("slug") slug: string, @Body() dto: CreateCheckoutDto) {
    return this.treatmentPlansService.createCheckout(slug, dto);
  }

  @Post("webhooks/stripe")
  webhook(@Headers("stripe-signature") signature: string | undefined, @Req() request: { rawBody?: Buffer }) {
    return this.treatmentPlansService.handleStripeWebhook(signature, request.rawBody);
  }
}

@Controller("webhooks/stripe")
export class StripeWebhookController {
  constructor(private readonly treatmentPlansService: TreatmentPlansService) {}

  @Post()
  webhook(@Headers("stripe-signature") signature: string | undefined, @Req() request: { rawBody?: Buffer }) {
    return this.treatmentPlansService.handleStripeWebhook(signature, request.rawBody);
  }
}
