import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import {
  type UpdatePetInput,
  updatePetSchema,
} from "@/backend/modules/pets/schemas/pet.schema";

export async function updatePet(id: string, input: UpdatePetInput) {
  const payload = updatePetSchema.parse(input);

  return prisma.pet.update({
    where: { id },
    data: payload,
    include: {
      media: {
        orderBy: [{ isMain: "desc" }, { sortOrder: "asc" }],
      },
    },
  });
}
