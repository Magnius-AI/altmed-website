import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AnalyticsEvent,
  Announcement,
  BlogCategory,
  BlogPost,
  BlogTag,
  ContactSubmission,
  FAQ,
  Provider,
  ServicePage,
  SiteSettings,
  User
} from "./entities";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.name"),
        ssl: configService.get<string>("app.environment") === "production"
          ? { rejectUnauthorized: false }
          : false,
        entities: [
          User,
          BlogPost,
          BlogCategory,
          BlogTag,
          FAQ,
          Announcement,
          ContactSubmission,
          ServicePage,
          Provider,
          SiteSettings,
          AnalyticsEvent
        ],
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule { }
