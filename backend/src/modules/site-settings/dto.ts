import { IsObject } from "class-validator";

export class UpdateSiteSettingDto {
  @IsObject()
  value!: Record<string, unknown>;
}
