import { PartialType } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

class BaseServicePageDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  heroContent?: string;

  @IsOptional()
  @IsString()
  bodyContent?: string;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateServicePageDto extends PartialType(BaseServicePageDto) {}
