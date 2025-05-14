export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum TimeUnit {
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  MONTHS = "months",
  YEARS = "years",
}

export type Task = {
  id: string;
  goalId: string;
  title: string;
  description?: string;
  importance: number;
  urgency: number;
  difficulty: number;
  successProbability: number;
  dependencies: string[];
  targetDate?: Date;
  status: TaskStatus;
  estimatedTime?: number;
  estimatedTimeUnit: TimeUnit;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskDto = {
  goalId: string;
  title: string;
  description?: string;
  importance: number;
  urgency: number;
  difficulty: number;
  successProbability: number;
  dependencies?: string[] | null;
  targetDate?: Date;
  estimatedTime?: number;
  estimatedTimeUnit: TimeUnit;
};

export type UpdateTaskDto = {
  title?: string;
  description?: string;
  importance?: number;
  urgency?: number;
  difficulty?: number;
  successProbability?: number;
  dependencies?: string[] | null;
  targetDate?: Date;
  status?: TaskStatus;
  estimatedTime?: number;
  estimatedTimeUnit?: TimeUnit;
};
