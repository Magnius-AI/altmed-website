import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactSubmission } from "../../database/entities";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ContactSubmission])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
