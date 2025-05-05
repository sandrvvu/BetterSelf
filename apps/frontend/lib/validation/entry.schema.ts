import { z } from "zod";

export const EntrySchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  content: z.string(),
  goalId: z.string().nullable(),
});

export type EntrySchemaType = z.infer<typeof EntrySchema>;
