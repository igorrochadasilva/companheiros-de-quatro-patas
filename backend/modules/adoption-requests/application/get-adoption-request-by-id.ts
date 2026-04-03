import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

export async function getAdoptionRequestById(id: string) {
  return prisma.adoptionRequest.findUnique({
    where: { id },
    include: {
      pet: {
        select: {
          id: true,
          name: true,
          species: true,
          status: true,
          published: true,
        },
      },
    },
  });
}
