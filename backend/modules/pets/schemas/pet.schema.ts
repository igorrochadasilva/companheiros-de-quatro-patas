import { PetGender, PetSize, PetSpecies, PetStatus } from "@prisma/client";
import { z } from "zod";

export const createPetSchema = z.object({
  externalId: z.string().trim().min(1).max(120).optional(),
  name: z.string().trim().min(2).max(120),
  species: z.nativeEnum(PetSpecies),
  breed: z.string().trim().max(120).optional(),
  age: z.string().trim().max(50).optional(),
  size: z.nativeEnum(PetSize).optional(),
  gender: z.nativeEnum(PetGender).optional(),
  color: z.string().trim().max(120).optional(),
  castrated: z.boolean().optional(),
  vaccinated: z.boolean().optional(),
  description: z.string().trim().max(4000).optional(),
  status: z.nativeEnum(PetStatus).optional(),
  city: z.string().trim().max(120).optional(),
  state: z.string().trim().max(2).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const updatePetSchema = createPetSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export type CreatePetInput = z.infer<typeof createPetSchema>;
export type UpdatePetInput = z.infer<typeof updatePetSchema>;
