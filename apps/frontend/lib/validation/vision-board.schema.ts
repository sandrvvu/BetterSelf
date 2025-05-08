import { z } from "zod";

export const VisionBoardSchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  description: z.string(),
  goalId: z.string().nullable(),
});

export type VisionBoardSchemaType = z.infer<typeof VisionBoardSchema>;
