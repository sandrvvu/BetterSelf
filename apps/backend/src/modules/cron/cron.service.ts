import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { GoalService } from "../goals/goal.service";
import { TaskService } from "../tasks/task.service";

@Injectable()
export class CronService {
  constructor(
    private readonly taskService: TaskService,
    private readonly goalService: GoalService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Cron(CronExpression.EVERY_MINUTE)
  async handleDailyCheck() {
    await this.taskService.markOverdueTasks();
    await this.goalService.markExpiredGoals();
  }
}
