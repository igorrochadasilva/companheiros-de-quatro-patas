import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

export async function getPetById(id: string) {
  return prisma.pet.findUnique({
    where: { id },
    include: {
      media: {
        orderBy: [{ isMain: "desc" }, { sortOrder: "asc" }],
      },
      adoptionRequests: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
