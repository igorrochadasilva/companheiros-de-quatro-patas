import { z } from "zod";

import type { PetFormValues } from "@/types";

const PET_SPECIES_VALUES = ["DOG", "CAT", "OTHER"] as const;
const PET_SIZE_VALUES = ["SMALL", "MEDIUM", "LARGE"] as const;
const PET_GENDER_VALUES = ["MALE", "FEMALE", "UNKNOWN"] as const;
const PET_STATUS_VALUES = [
  "AVAILABLE",
  "RESERVED",
  "ADOPTED",
  "TREATMENT",
] as const;

const optionalString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""))
    .transform((value) => {
      const normalized = value?.trim();
      return normalized ? normalized : undefined;
    });

export const petFormSchema: z.ZodType<PetFormValues> = z.object({
  externalId: optionalString(120),
  name: z.string().trim().min(2).max(120),
  species: z.enum(PET_SPECIES_VALUES),
  breed: optionalString(120),
  age: optionalString(50),
  size: z.enum(PET_SIZE_VALUES).optional(),
  gender: z.enum(PET_GENDER_VALUES).optional(),
  color: optionalString(120),
  castrated: z.boolean(),
  vaccinated: z.boolean(),
  description: optionalString(4000),
  status: z.enum(PET_STATUS_VALUES),
  city: optionalString(120),
  state: optionalString(2).transform((value) =>
    value ? value.toUpperCase() : undefined,
  ),
  featured: z.boolean(),
  published: z.boolean(),
});
