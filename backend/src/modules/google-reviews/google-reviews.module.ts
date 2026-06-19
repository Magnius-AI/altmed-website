import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleReview } from "../../database/entities";
import { GoogleReviewsController } from "./google-reviews.controller";
import { GoogleReviewsService } from "./google-reviews.service";

@Module({
  imports: [TypeOrmModule.forFeature([GoogleReview])],
  controllers: [GoogleReviewsController],
  providers: [GoogleReviewsService]
})
export class GoogleReviewsModule {}
