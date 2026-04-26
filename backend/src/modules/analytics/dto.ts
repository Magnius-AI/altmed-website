import { IsOptional, IsString } from "class-validator";

export class CreateAnalyticsEventDto {
  @IsString()
  eventName!: string;

  @IsOptional()
  @IsString()
  eventData?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}
