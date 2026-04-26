import { PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProviderDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  credentials?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsArray()
  specialties?: string[];

  @IsOptional()
  @IsString()
  personalNote?: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}

export class ReorderProvidersDto {
  @IsArray()
  items!: Array<{ id: string; displayOrder: number }>;
}
