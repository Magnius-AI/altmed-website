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
import { CreateFaqDto, ReorderFaqDto, UpdateFaqDto } from "./dto";
import { FaqService } from "./faq.service";

@Controller("faq")
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  findPublic() {
    return this.faqService.findPublic();
  }

  @Get("schema")
  schema() {
    return this.faqService.schema();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAdmin() {
    return this.faqService.findAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Patch("reorder")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  reorder(@Body() dto: ReorderFaqDto) {
    return this.faqService.reorder(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.faqService.remove(id);
  }
}
