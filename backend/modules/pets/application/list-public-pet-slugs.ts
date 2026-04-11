import "server-only";

import { PetStatus } from "@prisma/client";

import { prisma } from "@/backend/infrastructure/prisma/client";

export async function listPublicPetSlugs() {
  const pets = await prisma.pet.findMany({
    where: {
      published: true,
      status: {
        not: PetStatus.ADOPTED,
      },
    },
    select: {
      id: true,
      externalId: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return pets.map((pet) => ({
    slug: pet.externalId ?? pet.id,
    updatedAt: pet.updatedAt,
  }));
}
