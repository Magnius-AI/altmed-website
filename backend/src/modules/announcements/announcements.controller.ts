import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateAnnouncementDto, UpdateAnnouncementDto } from "./dto";
import { AnnouncementsService } from "./announcements.service";

@Controller("announcements")
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get("active")
  active() {
    return this.announcementsService.active();
  }

  @Get("banner")
  banner() {
    return this.announcementsService.banner();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  admin() {
    return this.announcementsService.admin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  create(@Body() dto: CreateAnnouncementDto) {
    return this.announcementsService.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() dto: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.announcementsService.remove(id);
  }
}
