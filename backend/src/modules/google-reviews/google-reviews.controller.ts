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
import { CreateGoogleReviewDto, UpdateGoogleReviewDto } from "./dto";
import { GoogleReviewsService } from "./google-reviews.service";

@Controller("google-reviews")
export class GoogleReviewsController {
  constructor(private readonly googleReviewsService: GoogleReviewsService) {}

  @Get()
  findPublic() {
    return this.googleReviewsService.findPublic();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAdmin() {
    return this.googleReviewsService.findAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  create(@Body() dto: CreateGoogleReviewDto) {
    return this.googleReviewsService.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() dto: UpdateGoogleReviewDto) {
    return this.googleReviewsService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.googleReviewsService.remove(id);
  }
}
