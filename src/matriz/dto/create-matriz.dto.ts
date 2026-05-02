
import { z } from 'zod';

export const createMatrizSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter ao menos 2 caracteres'),
  description: z.string().optional(),
  image: z.string().optional(),
  sampleIds: z.array(z.number().int().positive()).optional(),
});

export type CreateMatrizDto = z.infer<typeof createMatrizSchema>;