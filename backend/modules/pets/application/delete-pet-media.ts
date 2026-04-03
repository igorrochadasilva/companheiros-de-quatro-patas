import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

export async function deletePetMedia(id: string) {
  return prisma.petMedia.delete({
    where: { id },
  });
}
