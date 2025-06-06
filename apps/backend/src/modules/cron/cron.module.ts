import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TopsisService } from "src/common/services/topsis/topsis.service";

import { Category } from "../categories/category.entity";
import { Goal } from "../goals/goal.entity";
import { GoalService } from "../goals/goal.service";
import { Task } from "../tasks/task.entity";
import { TaskService } from "../tasks/task.service";
import { TopsisSettings } from "../users/topsis-settings.entity";

import { CronService } from "./cron.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task, Goal, Category, TopsisSettings])],
  providers: [TaskService, GoalService, CronService, TopsisService],
})
export class CronModule {}
