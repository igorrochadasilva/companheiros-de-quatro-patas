import { PetMediaType } from "@prisma/client";
import { z } from "zod";

export const createPetMediaSchema = z.object({
  petId: z.string().uuid(),
  type: z.nativeEnum(PetMediaType),
  url: z.string().url(),
  publicId: z.string().trim().min(1).max(255).optional(),
  isMain: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const updatePetMediaSchema = z
  .object({
    type: z.nativeEnum(PetMediaType).optional(),
    url: z.string().url().optional(),
    publicId: z.string().trim().min(1).max(255).optional(),
    isMain: z.boolean().optional(),
    sortOrder: z.number().int().min(0).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export type CreatePetMediaInput = z.infer<typeof createPetMediaSchema>;
export type UpdatePetMediaInput = z.infer<typeof updatePetMediaSchema>;
