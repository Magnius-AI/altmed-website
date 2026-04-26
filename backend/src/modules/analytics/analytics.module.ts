import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyticsEvent } from "../../database/entities";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService]
})
export class AnalyticsModule {}
