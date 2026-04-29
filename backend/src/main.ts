import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import helmet from "helmet";
import { join } from "path";
import { AppModule } from "./app.module";
import { RolesGuard } from "./common/guards/roles.guard";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ResponseTransformInterceptor } from "./common/interceptors/response-transform.interceptor";

function normalizeRouteSegment(value: string | undefined, fallback: string): string {
  const segment = (value ?? fallback).trim().replace(/^\/+|\/+$/g, "");
  return segment || fallback;
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const apiPrefix = normalizeRouteSegment(configService.get<string>("app.apiPrefix"), "api");
  const environment = configService.get<string>("app.environment") ?? "development";
  const isDevelopment = environment === "development";

  app.setGlobalPrefix(apiPrefix);
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>("app.frontendUrl") ?? "http://localhost:3000",
    credentials: true
  });
  app.use("/uploads", express.static(join(process.cwd(), "uploads")));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalGuards(new RolesGuard(reflector));

  if (isDevelopment) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Altmed API")
      .setDescription("Altmed Medical Center API")
      .setVersion("1.0.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  }

  await app.listen(configService.get<number>("app.port") ?? 3001);
}

void bootstrap();
