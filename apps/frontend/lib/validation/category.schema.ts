import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().nonempty({ message: "Name is required." }),
  description: z.string(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
