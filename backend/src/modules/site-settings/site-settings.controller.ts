import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { UpdateSiteSettingDto } from "./dto";
import { SiteSettingsService } from "./site-settings.service";

@Controller("settings")
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get("admin/all")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAll() {
    return this.siteSettingsService.findAll();
  }

  @Get(":key")
  findByKey(@Param("key") key: string) {
    return this.siteSettingsService.findByKey(key);
  }

  @Patch(":key")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("key") key: string, @Body() dto: UpdateSiteSettingDto) {
    return this.siteSettingsService.update(key, dto);
  }
}
