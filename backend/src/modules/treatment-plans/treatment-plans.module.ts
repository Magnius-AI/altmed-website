import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanAttendance, PlanEnrollment, StripeSettings, TreatmentPlan } from "../../database/entities";
import { SiteSettingsModule } from "../site-settings/site-settings.module";
import { StripeWebhookController, TreatmentPlansController } from "./treatment-plans.controller";
import { TreatmentPlansService } from "./treatment-plans.service";

@Module({
  imports: [SiteSettingsModule, TypeOrmModule.forFeature([TreatmentPlan, PlanEnrollment, PlanAttendance, StripeSettings])],
  controllers: [TreatmentPlansController, StripeWebhookController],
  providers: [TreatmentPlansService],
  exports: [TreatmentPlansService]
})
export class TreatmentPlansModule {}
