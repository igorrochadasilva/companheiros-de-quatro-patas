import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";

type ListPetsAdminInput = {
  page?: number;
  pageSize?: number;
  query?: string;
  species?: string | null;
  status?: string | null;
  published?: string | null;
};

export async function listPetsAdmin(input: ListPetsAdminInput) {
  const page = Math.max(1, Number(input.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(input.pageSize ?? 20)));
  const skip = (page - 1) * pageSize;

  const where: Record<string, unknown> = {};

  if (input.query?.trim()) {
    where.name = { contains: input.query.trim(), mode: "insensitive" };
  }

  if (input.species) where.species = input.species;
  if (input.status) where.status = input.status;
  if (input.published === "true") where.published = true;
  if (input.published === "false") where.published = false;

  const [items, total] = await Promise.all([
    prisma.pet.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      skip,
      take: pageSize,
      include: {
        media: {
          orderBy: [{ isMain: "desc" }, { sortOrder: "asc" }],
        },
      },
    }),
    prisma.pet.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
