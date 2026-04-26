import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FAQ } from "../../database/entities";
import { FaqController } from "./faq.controller";
import { FaqService } from "./faq.service";

@Module({
  imports: [TypeOrmModule.forFeature([FAQ])],
  controllers: [FaqController],
  providers: [FaqService],
  exports: [FaqService]
})
export class FaqModule {}
