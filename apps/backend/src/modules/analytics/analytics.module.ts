import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Category } from "../categories/category.entity";
import { CategoryService } from "../categories/category.service";

import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";

@Module({
  controllers: [AnalyticsController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, AnalyticsService],
})
export class AnalyticsModule {}
