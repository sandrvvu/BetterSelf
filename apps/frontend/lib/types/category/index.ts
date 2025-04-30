import { Goal } from "../goal";

export type Category = {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  goals: Goal[];
};

export type CategoryWithGoalCount = Category & {
  allGoals?: number;
  completedGoals?: number;
};

export type CreateCategoryDto = {
  name?: string;
  description?: string;
};

export type UpdateCategoryDto = {
  name?: string;
  description?: string;
};
