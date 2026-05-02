// src/sample/dto/create-sample.dto.ts
import { z } from "zod";

export const createSampleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type CreateSampleDto = z.infer<typeof createSampleSchema>;