import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards
} from "@nestjs/common";
import { Response } from "express";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { LoginDto, ChangePasswordDto, RefreshTokenDto } from "./dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(dto);
    response.cookie("altmed_admin_access_token", result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000
    });
    response.cookie("altmed_admin_refresh_token", result.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return result;
  }

  @Post("refresh")
  async refresh(@Body() dto: RefreshTokenDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.refresh(dto.refreshToken);
    response.cookie("altmed_admin_access_token", result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000
    });
    response.cookie("altmed_admin_refresh_token", result.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return result;
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("altmed_admin_access_token");
    response.clearCookie("altmed_admin_refresh_token");
    return { success: true };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  async me(@CurrentUser() user: { id: string }) {
    return this.authService.me(user.id);
  }

  @Post("change-password")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  changePassword(@CurrentUser() user: { id: string }, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, dto);
  }
}
