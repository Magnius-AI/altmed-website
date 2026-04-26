import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest<{ url?: string }>();
        const url = request?.url ?? "";

        if (
          typeof data === "string" ||
          Buffer.isBuffer(data) ||
          url.endsWith("/sitemap.xml") ||
          url.endsWith("/robots.txt") ||
          url.endsWith("/export")
        ) {
          return data;
        }

        return {
          data,
          timestamp: new Date().toISOString()
        };
      })
    );
  }
}
