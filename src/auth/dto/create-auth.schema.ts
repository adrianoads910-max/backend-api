import { z } from "zod";

export const createAuthSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8)
    .refine((password) => {
      const hasNumber = /\d/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password);
      return (
        hasNumber &&
        hasUppercase &&
        hasLowercase &&
        hasSpecialChar
      );
    }, "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"),
});

export type CreateAuthDto = z.infer<typeof createAuthSchema>;