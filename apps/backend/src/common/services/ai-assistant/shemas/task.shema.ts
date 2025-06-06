import { z } from "zod";

export const TaskSchema = z.object({
  description: z.string().optional(),
  difficulty: z.number(),
  estimatedTime: z.number().optional(),
  estimatedTimeUnit: z.enum(["minutes", "hours", "days", "months", "years"]),
  goalId: z.string(),
  importance: z.number(),
  successProbability: z.number(),
  title: z.string(),
  urgency: z.number(),
});

export const TaskResponseSchema = z.object({
  tasks: z.array(TaskSchema),
});
