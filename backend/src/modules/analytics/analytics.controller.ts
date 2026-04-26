import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateAnalyticsEventDto } from "./dto";
import { AnalyticsService } from "./analytics.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post("event")
  create(@Body() dto: CreateAnalyticsEventDto, @Req() request: Request) {
    return this.analyticsService.create(dto, request.ip);
  }

  @Get("summary")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  summary() {
    return this.analyticsService.summary();
  }

  @Get("chatbot")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  chatbot() {
    return this.analyticsService.chatbot();
  }
}
