import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import configuration from "./config/configuration";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BlogModule } from "./modules/blog/blog.module";
import { FaqModule } from "./modules/faq/faq.module";
import { AnnouncementsModule } from "./modules/announcements/announcements.module";
import { ContactModule } from "./modules/contact/contact.module";
import { ServicesPagesModule } from "./modules/services-pages/services-pages.module";
import { ProvidersModule } from "./modules/providers/providers.module";
import { SiteSettingsModule } from "./modules/site-settings/site-settings.module";
import { SeoModule } from "./modules/seo/seo.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { UploadsModule } from "./modules/uploads/uploads.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100
      }
    ]),
    DatabaseModule,
    AuthModule,
    BlogModule,
    FaqModule,
    AnnouncementsModule,
    ContactModule,
    ServicesPagesModule,
    ProvidersModule,
    SiteSettingsModule,
    SeoModule,
    AnalyticsModule,
    UploadsModule,
    HealthModule
  ]
})
export class AppModule {}
