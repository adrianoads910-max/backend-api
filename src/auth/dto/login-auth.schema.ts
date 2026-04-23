import { z } from "zod";

export const loginAuthSchema = z.object({
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

export type LoginAuthDto = z.infer<typeof loginAuthSchema>;