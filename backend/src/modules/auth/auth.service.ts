import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../../database/entities";
import { ChangePasswordDto, LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      ...(await this.createTokenPair(user)),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
        role: string;
        tokenType: "access" | "refresh";
        name?: string | null;
      }>(refreshToken, {
        secret: this.configService.get<string>("auth.refreshSecret")
      });

      if (payload.tokenType !== "refresh") {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const user = await this.usersRepository.findOne({ where: { id: payload.sub } });
      if (!user || !user.isActive) {
        throw new UnauthorizedException("User not found");
      }

      return {
        ...(await this.createTokenPair(user)),
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async me(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ success: boolean }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const passwordMatches = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    user.passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.usersRepository.save(user);
    return { success: true };
  }

  private async createTokenPair(user: User) {
    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        tokenType: "access"
      },
      {
        secret: this.configService.get<string>("auth.jwtSecret"),
        expiresIn: this.configService.get<string>("auth.jwtExpiresIn")
      }
    );

    const refresh_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        tokenType: "refresh"
      },
      {
        secret: this.configService.get<string>("auth.refreshSecret"),
        expiresIn: this.configService.get<string>("auth.refreshExpiresIn")
      }
    );

    return { access_token, refresh_token };
  }
}
