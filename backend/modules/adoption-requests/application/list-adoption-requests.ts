import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

type ListAdoptionRequestsInput = {
  page?: number;
  pageSize?: number;
  petId?: string | null;
  status?: string | null;
};

export async function listAdoptionRequests(input: ListAdoptionRequestsInput) {
  const page = Math.max(1, Number(input.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(input.pageSize ?? 20)));
  const skip = (page - 1) * pageSize;

  const where: Record<string, unknown> = {};
  if (input.petId) where.petId = input.petId;
  if (input.status) where.status = input.status;

  const [items, total] = await Promise.all([
    prisma.adoptionRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
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
    }),
    prisma.adoptionRequest.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
