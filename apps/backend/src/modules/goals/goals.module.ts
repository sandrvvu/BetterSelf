import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Category } from "../categories/category.entity";

import { GoalController } from "./goal.controller";
import { Goal } from "./goal.entity";
import { GoalService } from "./goal.service";

@Module({
  controllers: [GoalController],
  imports: [TypeOrmModule.forFeature([Category, Goal])],
  providers: [GoalService],
})
export class GoalsModule {}
