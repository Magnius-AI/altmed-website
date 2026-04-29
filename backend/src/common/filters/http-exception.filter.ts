import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";

function normalizeMessage(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(normalizeMessage).join("; ");
  }

  if (value && typeof value === "object") {
    const record = value as { message?: unknown; error?: unknown };
    return normalizeMessage(record.message ?? record.error ?? JSON.stringify(value));
  }

  return String(value ?? "Request failed");
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException ? exception.getResponse() : "Internal server error";

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: normalizeMessage(payload),
      timestamp: new Date().toISOString()
    });
  }
}
