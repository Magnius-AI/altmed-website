import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

export class CreateContactSubmissionDto {
  @IsString()
  fullName!: string;

  @IsString()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  preferredContactMethod?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsString()
  @MaxLength(1000)
  message!: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsNumber()
  recaptchaScore?: number;

  @IsOptional()
  @IsBoolean()
  passedTimeCheck?: boolean;
}
