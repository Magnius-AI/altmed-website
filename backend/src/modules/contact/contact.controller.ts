import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
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
  submit(
    @Body() dto: CreateContactSubmissionDto,
    @Req() request: Request,
    @Headers("x-forwarded-for") forwardedFor?: string,
    @Headers("x-real-ip") realIp?: string
  ) {
    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || request.ip;
    return this.contactService.submit(dto, clientIp);
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
