import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import {
  type CreatePetInput,
  createPetSchema,
} from "@/backend/modules/pets/schemas/pet.schema";

export async function createPet(input: CreatePetInput) {
  const payload = createPetSchema.parse(input);

  return prisma.pet.create({
    data: payload,
    include: {
      media: {
        orderBy: [{ isMain: "desc" }, { sortOrder: "asc" }],
      },
    },
  });
}
