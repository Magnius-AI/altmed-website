import { Body, Controller, Get, Header, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { SeoService } from "./seo.service";

@Controller("seo")
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get("sitemap.xml")
  @Header("Content-Type", "application/xml")
  sitemapXml() {
    return this.seoService.sitemapXml();
  }

  @Get("robots.txt")
  @Header("Content-Type", "text/plain")
  robotsTxt() {
    return this.seoService.robotsTxt();
  }

  @Get("defaults")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  defaults() {
    return this.seoService.defaults();
  }

  @Patch("defaults")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  updateDefaults(@Body() body: { value: Record<string, unknown> }) {
    return this.seoService.updateDefaults(body.value);
  }

  @Get("schema/clinic")
  clinicSchema() {
    return this.seoService.clinicSchema();
  }
}
