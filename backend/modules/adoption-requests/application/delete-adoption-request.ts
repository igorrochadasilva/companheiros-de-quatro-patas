import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

export async function deleteAdoptionRequest(id: string) {
  return prisma.adoptionRequest.delete({
    where: { id },
  });
}
