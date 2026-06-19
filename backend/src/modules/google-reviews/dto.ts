import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateGoogleReviewDto {
  @IsString()
  reviewerName!: string;

  @IsInt()
  @Min(4)
  @Max(5)
  rating!: number;

  @IsString()
  reviewText!: string;

  @IsOptional()
  @IsDateString()
  reviewDate?: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateGoogleReviewDto extends PartialType(CreateGoogleReviewDto) {}
