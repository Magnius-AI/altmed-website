import { PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min
} from "class-validator";

export class CreateTreatmentPlanDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  durationLabel?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationDays?: number;

  @IsInt()
  @Min(0)
  priceCents!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsArray()
  checklist?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateTreatmentPlanDto extends PartialType(CreateTreatmentPlanDto) {}

export class CreateCheckoutDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsIn(["pending", "paid", "active", "completed", "cancelled", "refunded", "failed"])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateStripeSettingsDto {
  @IsOptional()
  @IsString()
  stripePublishableKey?: string;

  @IsOptional()
  @IsString()
  stripeSecretKey?: string;

  @IsOptional()
  @IsString()
  stripeWebhookSecret?: string;

  @IsOptional()
  @IsBoolean()
  isLiveMode?: boolean;
}
