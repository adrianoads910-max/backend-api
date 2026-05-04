// src/substance/dto/create-substance.dto.ts
import { z } from "zod";

const ionSchema = z.object({
  mz: z.number().int().positive("m/z must be a positive integer"),
  intensity: z
    .number()
    .min(0, "Intensity must be at least 0")
    .max(100, "Intensity must be at most 100"),
});

export const createSubstanceSchema = z.object({
  nist: z
    .number()
    .min(0, "NIST must be at least 0")
    .max(100, "NIST must be at most 100"),

  tR: z.number().positive("Retention time must be positive"),

  name: z.string().min(2, "Name must be at least 2 characters long"),
  concentration: z.number().min(0).optional(),

  class: z.string().min(2, "Class must be at least 2 characters long"),
  smiles: z.string().min(2, "SMILES must be at least 2 characters long"),

  molecularFormula: z
    .string()
    .regex(/^[A-Z][a-zA-Z0-9]*$/, "Invalid molecular formula"),

  molecularWeight: z.number().positive("Molecular weight must be positive"),

  ionBase: ionSchema,

  otherIons: z
    .array(ionSchema)
    .min(1, "At least one fragment ion is required"),
});

export type CreateSubstanceDto = z.infer<typeof createSubstanceSchema>;