import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha precisa ter ao menos 6 caracteres'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;