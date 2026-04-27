import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET muito curto'),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);