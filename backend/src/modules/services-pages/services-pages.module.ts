import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicePage } from "../../database/entities";
import { ServicesPagesController } from "./services-pages.controller";
import { ServicesPagesService } from "./services-pages.service";

@Module({
  imports: [TypeOrmModule.forFeature([ServicePage])],
  controllers: [ServicesPagesController],
  providers: [ServicesPagesService],
  exports: [ServicesPagesService]
})
export class ServicesPagesModule {}
