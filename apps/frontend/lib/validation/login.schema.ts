import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Invalid email format." }),
  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least 1 special character.",
    }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
