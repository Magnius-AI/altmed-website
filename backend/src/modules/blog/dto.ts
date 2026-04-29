import { PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString
} from "class-validator";

export class CreateBlogPostDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  body!: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  @IsString()
  featuredImageAlt?: string;

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
  canonicalUrl?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsArray()
  faqs?: Array<{ question: string; answer: string }>;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}

export class CreateBlogTaxonomyDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateBlogTaxonomyDto extends PartialType(CreateBlogTaxonomyDto) {}
