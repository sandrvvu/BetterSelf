import { Task } from "@/lib";

export enum GoalStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  NEEDS_CORRECTION = "needs_correction",
  ARCHIVED = "archived",
}

export enum GoalPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export type Goal = {
  id: string;
  categoryId: string;
  title: string;
  description?: string;
  priority: GoalPriority;
  targetDate?: Date;
  status: GoalStatus;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateGoalDto = {
  categoryId: string;
  title: string;
  description?: string;
  priority: GoalPriority;
  targetDate?: Date;
};

export type UpdateGoalDto = {
  title?: string;
  description?: string;
  priority?: GoalPriority;
  targetDate?: Date;
  status?: GoalStatus;
};

export type GoalWithCategoryName = Goal & {
  categoryName: string;
};

export interface Info {
  id: string;
  title: string;
}

export interface TaskWithDependencies extends Omit<Task, "dependencies"> {
  dependencies: Info[];
}

export type GoalWithFullInfo = Goal & {
  categoryName: string;
  progress: {
    allTasksCount: number;
    completedTasksCount: number;
    progressPercentage: number;
  };
  tasks: TaskWithDependencies[];
};
