import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

export async function deletePet(id: string) {
  return prisma.pet.delete({
    where: { id },
  });
}
