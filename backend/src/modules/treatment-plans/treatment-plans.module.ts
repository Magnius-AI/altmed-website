import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanEnrollment, StripeSettings, TreatmentPlan } from "../../database/entities";
import { StripeWebhookController, TreatmentPlansController } from "./treatment-plans.controller";
import { TreatmentPlansService } from "./treatment-plans.service";

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentPlan, PlanEnrollment, StripeSettings])],
  controllers: [TreatmentPlansController, StripeWebhookController],
  providers: [TreatmentPlansService],
  exports: [TreatmentPlansService]
})
export class TreatmentPlansModule {}
