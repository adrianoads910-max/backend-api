import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export type LoginDto = z.infer<typeof LoginSchema>;