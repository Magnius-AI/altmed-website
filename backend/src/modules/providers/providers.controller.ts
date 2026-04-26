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
import { CreateProviderDto, ReorderProvidersDto, UpdateProviderDto } from "./dto";
import { ProvidersService } from "./providers.service";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  findPublic() {
    return this.providersService.findPublic();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAdmin() {
    return this.providersService.findAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  create(@Body() dto: CreateProviderDto) {
    return this.providersService.create(dto);
  }

  @Patch("reorder")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  reorder(@Body() dto: ReorderProvidersDto) {
    return this.providersService.reorder(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() dto: UpdateProviderDto) {
    return this.providersService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}
