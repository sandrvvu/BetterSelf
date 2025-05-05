import { z } from "zod";

import { GoalPriority } from "@/lib/types/goal";

export const GoalSchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  description: z.string(),
  priority: z.nativeEnum(GoalPriority),
  targetDate: z.date().optional(),
});

export type GoalSchemaType = z.infer<typeof GoalSchema>;
