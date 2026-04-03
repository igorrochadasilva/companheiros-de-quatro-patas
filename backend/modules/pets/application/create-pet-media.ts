import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import {
  type CreatePetMediaInput,
  createPetMediaSchema,
} from "@/backend/modules/pets/schemas/pet-media.schema";

export async function createPetMedia(input: CreatePetMediaInput) {
  const payload = createPetMediaSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    if (payload.isMain) {
      await tx.petMedia.updateMany({
        where: { petId: payload.petId, isMain: true },
        data: { isMain: false },
      });
    }

    return tx.petMedia.create({
      data: payload,
    });
  });
}
