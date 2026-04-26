import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { UpdateServicePageDto } from "./dto";
import { ServicesPagesService } from "./services-pages.service";

@Controller("services-pages")
export class ServicesPagesController {
  constructor(private readonly servicesPagesService: ServicesPagesService) {}

  @Get()
  findAllPublic() {
    return this.servicesPagesService.findAllPublic();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.servicesPagesService.findBySlug(slug);
  }

  @Patch(":slug")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("slug") slug: string, @Body() dto: UpdateServicePageDto) {
    return this.servicesPagesService.update(slug, dto);
  }

  @Patch(":slug/toggle")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  toggle(@Param("slug") slug: string) {
    return this.servicesPagesService.toggle(slug);
  }
}
