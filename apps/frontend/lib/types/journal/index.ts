export type Entry = {
  id: string;
  title: string;
  content?: string;
  userId: string;
  goalId: string | null;
  goalTitle?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEntryDto = {
  title: string;
  content?: string;
  goalId: string | null;
};

export type UpdateEntryDto = {
  title?: string;
  content?: string;
  goalId?: string | null;
};
