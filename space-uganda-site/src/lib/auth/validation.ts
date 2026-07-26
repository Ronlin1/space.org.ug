import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().trim().min(8)
});

export type LoginInput = z.infer<typeof loginSchema>;
