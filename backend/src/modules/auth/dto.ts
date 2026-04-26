import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  currentPassword!: string;

  @IsString()
  @MinLength(8)
  newPassword!: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class AuthResponseDto {
  access_token!: string;
  refresh_token!: string;
  user!: {
    id: string;
    email: string;
    role: string;
    name: string | null;
  };
}

export class JwtPayloadDto {
  sub!: string;
  email!: string;
  role!: string;
  tokenType!: "access" | "refresh";
  @IsOptional()
  name?: string | null;
}
