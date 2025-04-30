export enum GoalStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
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
  id: string;
  categoryId: string;
  title: string;
  description?: string;
  priority: GoalPriority;
  targetDate?: Date;
};
