import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost, ServicePage, SiteSettings } from "../../database/entities";
import { SeoController } from "./seo.controller";
import { SeoService } from "./seo.service";

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, ServicePage, SiteSettings])],
  controllers: [SeoController],
  providers: [SeoService]
})
export class SeoModule {}
