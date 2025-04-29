export type Category = {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryWithGoalCount = Category & {
  allGoals?: number;
  completedGoals?: number;
};
