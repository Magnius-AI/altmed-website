import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "../../database/entities";
import { ProvidersController } from "./providers.controller";
import { ProvidersService } from "./providers.service";

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService]
})
export class ProvidersModule {}
