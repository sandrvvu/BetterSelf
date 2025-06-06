import { z } from "zod";

export const TopsisSettingsSchema = z.object({
    weights: z
    .array(z.coerce.number().min(0))
    .refine((arr) => Math.abs(arr.reduce((a, b) => a + b, 0) - 1) < 0.01, {
      message: "Total weight must be 1",
    }),
  isBenefit: z.array(z.boolean()),
});

export type TopsisSettingsSchemaType = z.infer<typeof TopsisSettingsSchema>;
