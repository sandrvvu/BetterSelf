import { z } from "zod";

import { TimeUnit } from "@/lib";

export const TaskSchema = z.object({
    title: z.string().nonempty({ message: "Title is required." }),
    description: z.string().optional(),
    importance: z.number().int(), 
    urgency: z.number().int(),  
    difficulty: z.number().int(),
    successProbability: z.number(),
    dependencies: z.string().uuid().array().optional(),
    targetDate: z.date().optional(),
    estimatedTime: z.number().optional(),
    estimatedTimeUnit: z.nativeEnum(TimeUnit), 
  });
  
  export type TaskSchemaType = z.infer<typeof TaskSchema>;
