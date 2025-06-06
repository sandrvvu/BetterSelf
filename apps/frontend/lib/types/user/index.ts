export type User = {
  id: string;
  name: string;
  email: string;
};

export type UpdateUserDto = {
  name?: string;
  password?: string;
};

export type UserAnalytics = {
  completedGoals: number;
  taskCalendar: Record<string, number>;
  tasksByCategory: Record<string, number>;
  tasksByMonth: Record<string, number>;
  totalGoals: number;
};
