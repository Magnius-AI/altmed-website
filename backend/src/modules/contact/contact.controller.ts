import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateContactSubmissionDto } from "./dto";
import { ContactService } from "./contact.service";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  submit(@Body() dto: CreateContactSubmissionDto, @Req() request: Request) {
    return this.contactService.submit(dto, request.ip);
  }

  @Get("submissions")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAll() {
    return this.contactService.findAll();
  }

  @Patch(":id/reviewed")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  markReviewed(@Param("id") id: string) {
    return this.contactService.markReviewed(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.contactService.remove(id);
  }

  @Get("export")
  @Header("Content-Type", "text/csv")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  exportCsv() {
    return this.contactService.exportCsv();
  }

  @Get("stats")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  stats() {
    return this.contactService.stats();
  }
}
