import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TopsisService } from "src/common/services/topsis/topsis.service";

import { AiAssistantService } from "../../common/services/ai-assistant/ai-assistant.service";
import { Category } from "../categories/category.entity";
import { Task } from "../tasks/task.entity";
import { TopsisSettings } from "../users/topsis-settings.entity";

import { GoalController } from "./goal.controller";
import { Goal } from "./goal.entity";
import { GoalService } from "./goal.service";

@Module({
  controllers: [GoalController],
  exports: [GoalService],
  imports: [TypeOrmModule.forFeature([Category, Goal, Task, TopsisSettings])],
  providers: [AiAssistantService, GoalService, TopsisService],
})
export class GoalsModule {}
