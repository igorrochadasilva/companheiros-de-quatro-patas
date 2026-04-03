import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import {
  type UpdatePetMediaInput,
  updatePetMediaSchema,
} from "@/backend/modules/pets/schemas/pet-media.schema";

export async function updatePetMedia(id: string, input: UpdatePetMediaInput) {
  const payload = updatePetMediaSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    if (payload.isMain) {
      const current = await tx.petMedia.findUnique({ where: { id } });
      if (current) {
        await tx.petMedia.updateMany({
          where: { petId: current.petId, isMain: true, NOT: { id } },
          data: { isMain: false },
        });
      }
    }

    return tx.petMedia.update({
      where: { id },
      data: payload,
    });
  });
}
