import { z } from "zod";

export const RegisterUserScheme = z.object({
  name: z.string(),
  email: z.string().refine((value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
});

export type RegisterUserType = z.infer<typeof RegisterUserScheme>;