import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.altmed_admin_access_token,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("auth.jwtSecret")
    });
  }

  validate(payload: { sub: string; email: string; role: string; name?: string | null }) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name ?? null
    };
  }
}
