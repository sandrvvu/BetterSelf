import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "../categories/category.entity";
import { GoalStatus } from "../goals/goal.entity";
import { TaskStatus } from "../tasks/task.entity";

import { UserAnalytics } from "./libs/dto/user-analytics";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  public async getUserAnalytics(
    userId: string,
    months = 6,
    filterByDate = true,
  ): Promise<UserAnalytics> {
    const categories = await this.categoryRepo.find({
      relations: ["goals", "goals.tasks"],
      where: { userId },
    });

    const goals = categories.flatMap((category) => category.goals ?? []);
    const tasks = goals.flatMap((goal) => goal.tasks ?? []);

    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - months);

    const completedGoals = filterByDate
      ? goals.filter(
          (g) =>
            g.status === GoalStatus.COMPLETED &&
            new Date(g.createdAt) >= fromDate,
        ).length
      : goals.filter((g) => g.status === GoalStatus.COMPLETED).length;

    const totalGoals = goals.filter(
      (g) => new Date(g.createdAt) >= fromDate,
    ).length;

    const goalsByCategory: Record<string, number> = {};
    const tasksByCategory: Record<string, number> = {};
    const tasksByMonth: Record<string, number> = {};
    const taskCalendar: Record<string, number> = {};

    for (const category of categories) {
      const catName = category.name ?? "Uncategorized";
      const categoryGoals = category.goals ?? [];

      goalsByCategory[catName] = categoryGoals.length;

      let completedTasksInCategory = 0;
      for (const goal of categoryGoals) {
        completedTasksInCategory += (goal.tasks ?? []).filter(
          (t) =>
            t.status === TaskStatus.COMPLETED &&
            (!filterByDate ||
              (t.completedAt && new Date(t.completedAt) >= fromDate)),
        ).length;
      }

      tasksByCategory[catName] = completedTasksInCategory;
    }

    const calendarFromDate = new Date();
    calendarFromDate.setFullYear(calendarFromDate.getFullYear() - 1);

    for (const task of tasks) {
      if (task.status === TaskStatus.COMPLETED && task.completedAt) {
        const completedAt = new Date(task.completedAt);

        if (completedAt >= fromDate) {
          const monthKey = completedAt.toISOString().slice(0, 7);
          tasksByMonth[monthKey] = (tasksByMonth[monthKey] || 0) + 1;
        }

        if (completedAt >= calendarFromDate) {
          const dayKey = completedAt.toISOString().slice(0, 10);
          taskCalendar[dayKey] = (taskCalendar[dayKey] || 0) + 1;
        }
      }
    }

    return {
      completedGoals,
      taskCalendar,
      tasksByCategory,
      tasksByMonth,
      totalGoals,
    };
  }
}
