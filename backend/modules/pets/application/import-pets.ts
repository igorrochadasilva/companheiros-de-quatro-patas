import "server-only";

import { PetSpecies } from "@prisma/client";

import { prisma } from "@/backend/infrastructure/prisma/client";
import { createPetSchema } from "@/backend/modules/pets/schemas/pet.schema";
import { normalizePetImportRow } from "@/backend/modules/pets/utils/pet-import";
import type { PetImportResponse } from "@/types";

type ImportPetsInput = {
  items: Record<string, unknown>[];
};

function hasObjectShape(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function importPets(
  input: ImportPetsInput,
): Promise<PetImportResponse> {
  const errors: PetImportResponse["errors"] = [];
  const duplicates: PetImportResponse["duplicates"] = [];

  let inserted = 0;
  let ignored = 0;

  for (let index = 0; index < input.items.length; index += 1) {
    const rowNumber = index + 2;
    const current = input.items[index];

    if (!hasObjectShape(current)) {
      ignored += 1;
      errors.push({
        row: rowNumber,
        message: "Linha invalida: formato nao suportado.",
      });
      continue;
    }

    const normalized = normalizePetImportRow(current);
    if (normalized.errors.length > 0) {
      ignored += 1;
      for (const fieldError of normalized.errors) {
        errors.push({
          row: rowNumber,
          field: fieldError.field,
          message: fieldError.message,
        });
      }
      continue;
    }

    const parsed = createPetSchema.safeParse(normalized.data);
    if (!parsed.success) {
      ignored += 1;
      for (const issue of parsed.error.issues) {
        errors.push({
          row: rowNumber,
          field: issue.path.join("."),
          message: issue.message,
        });
      }
      continue;
    }

    const payload = parsed.data;

    if (payload.externalId) {
      const existingByExternalId = await prisma.pet.findUnique({
        where: { externalId: payload.externalId },
        select: { id: true },
      });

      if (existingByExternalId) {
        ignored += 1;
        duplicates.push({
          row: rowNumber,
          externalId: payload.externalId,
          reason: "external_id ja existe",
        });
        continue;
      }
    }

    const existingByName = await prisma.pet.findFirst({
      where: {
        name: { equals: payload.name, mode: "insensitive" },
        species: payload.species ?? PetSpecies.DOG,
        city: payload.city
          ? { equals: payload.city, mode: "insensitive" }
          : null,
      },
      select: { id: true },
    });

    if (existingByName) {
      ignored += 1;
      duplicates.push({
        row: rowNumber,
        name: payload.name,
        reason: "registro semelhante ja existe (name + species + city)",
      });
      continue;
    }

    await prisma.pet.create({ data: payload });
    inserted += 1;
  }

  return {
    inserted,
    ignored,
    duplicates,
    errors,
  };
}
