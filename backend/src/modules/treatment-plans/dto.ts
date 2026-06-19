import { PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  MaxLength,
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
  @MaxLength(160)
  name!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;
}

export class CreateEnrollmentDto {
  @IsString()
  @MaxLength(120)
  planId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  patientName?: string;

  @IsEmail()
  @MaxLength(254)
  patientEmail!: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  patientPhone?: string;

  @IsOptional()
  @IsIn(["pending", "paid", "active", "completed", "cancelled", "refunded", "failed"])
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  amountPaidCents?: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  startsAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  endsAt?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  visitCount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  lastVisitAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  nextVisitAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsIn(["pending", "paid", "active", "completed", "cancelled", "refunded", "failed"])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  patientName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  patientPhone?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  amountPaidCents?: number;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  startsAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  endsAt?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  visitCount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  lastVisitAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  nextVisitAt?: string;
}

export class RecordAttendanceDto {
  @IsString()
  @MaxLength(24)
  enrollmentCode!: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  visitedAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  staffName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
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
  @IsString()
  stripeWebhookEndpointUrl?: string;

  @IsOptional()
  @IsBoolean()
  isLiveMode?: boolean;
}
