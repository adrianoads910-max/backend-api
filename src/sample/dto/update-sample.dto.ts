// src/sample/dto/update-sample.dto.ts
import { z } from "zod";
import { createSampleSchema } from "./create-sample.dto";

export const updateSampleSchema = createSampleSchema.partial();

export type UpdateSampleDto = z.infer<typeof updateSampleSchema>;