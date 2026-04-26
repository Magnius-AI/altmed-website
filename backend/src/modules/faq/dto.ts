import { PartialType } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateFaqDto {
  @IsString()
  question!: string;

  @IsString()
  answer!: string;

  @IsString()
  category!: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}

export class ReorderFaqDto {
  @IsArray()
  items!: Array<{ id: string; displayOrder: number }>;
}
