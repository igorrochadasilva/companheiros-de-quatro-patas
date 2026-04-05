import "server-only";

import { PetStatus } from "@prisma/client";

import { prisma } from "@/backend/infrastructure/prisma/client";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function getPublicPetById(slug: string) {
  const whereById = isUuid(slug)
    ? [{ id: slug }, { externalId: slug }]
    : [{ externalId: slug }];

  return prisma.pet.findFirst({
    where: {
      published: true,
      status: {
        not: PetStatus.ADOPTED,
      },
      OR: whereById,
    },
    include: {
      media: {
        orderBy: [{ isMain: "desc" }, { sortOrder: "asc" }],
      },
    },
  });
}
