import "server-only";

import {
  PetSize as PrismaPetSize,
  PetSpecies as PrismaPetSpecies,
  PetStatus,
  Prisma,
} from "@prisma/client";

import { prisma } from "@/backend/infrastructure/prisma/client";
import type {
  Pet,
  PetAgeGroup,
  PetSize,
  PetSort,
  PetSpecies,
  PetTag,
} from "@/types";

const SORT_VALUES: PetSort[] = [
  "recent",
  "urgent",
  "age_asc",
  "age_desc",
  "name_asc",
];

type ListPetsInput = {
  species?: PetSpecies;
  size?: PetSize;
  ageGroup?: PetAgeGroup;
  city?: string;
  urgentOnly?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: string | null;
};

type PetsListResponse = {
  items: Pet[];
  total: number;
  page: number;
  totalPages: number;
};

type PetRow = {
  id: string;
  name: string;
  species: PrismaPetSpecies;
  size: PrismaPetSize | null;
  age_years: number;
  city: string | null;
  state: string | null;
  description: string | null;
  vaccinated: boolean;
  castrated: boolean;
  status: PetStatus;
  main_image_url: string | null;
};

function toPrismaSpecies(species?: PetSpecies): PrismaPetSpecies | undefined {
  if (!species) return undefined;
  const mapping: Record<PetSpecies, PrismaPetSpecies> = {
    dog: PrismaPetSpecies.DOG,
    cat: PrismaPetSpecies.CAT,
    other: PrismaPetSpecies.OTHER,
  };
  return mapping[species];
}

function toPrismaSize(size?: PetSize): PrismaPetSize | undefined {
  if (!size) return undefined;
  const mapping: Record<PetSize, PrismaPetSize> = {
    small: PrismaPetSize.SMALL,
    medium: PrismaPetSize.MEDIUM,
    large: PrismaPetSize.LARGE,
  };
  return mapping[size];
}

function fromPrismaSpecies(species: PrismaPetSpecies): PetSpecies {
  const mapping: Record<PrismaPetSpecies, PetSpecies> = {
    DOG: "dog",
    CAT: "cat",
    OTHER: "other",
  };
  return mapping[species];
}

function fromPrismaSize(size: PrismaPetSize | null): PetSize {
  const mapping: Record<PrismaPetSize, PetSize> = {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
  };
  return size ? mapping[size] : "medium";
}

function toAgeGroup(ageYears: number): PetAgeGroup {
  if (ageYears < 1) return "puppy";
  if (ageYears >= 7) return "senior";
  return "adult";
}

function toTags(input: {
  vaccinated: boolean;
  castrated: boolean;
  status: PetStatus;
}): PetTag[] {
  const tags: PetTag[] = [];
  if (input.vaccinated) tags.push("vaccinated");
  if (input.castrated) tags.push("neutered");
  if (input.status === PetStatus.TREATMENT) tags.push("urgent");
  return tags;
}

const AGE_YEARS_SQL = Prisma.sql`
  CASE
    WHEN COALESCE(BTRIM(p.age), '') = '' THEN 1::double precision
    WHEN LOWER(p.age) LIKE '%mes%' THEN
      COALESCE(
        NULLIF(
          REPLACE(
            REGEXP_REPLACE(LOWER(p.age), '[^0-9,.]', '', 'g'),
            ',',
            '.'
          ),
          ''
        ),
        '1'
      )::double precision / 12
    ELSE
      COALESCE(
        NULLIF(
          REPLACE(
            REGEXP_REPLACE(LOWER(p.age), '[^0-9,.]', '', 'g'),
            ',',
            '.'
          ),
          ''
        ),
        '1'
      )::double precision
  END
`;

function buildWhereSql(input: ListPetsInput) {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`p.published = true`,
    Prisma.sql`p.status <> ${PetStatus.ADOPTED}`,
  ];

  const species = toPrismaSpecies(input.species);
  if (species) {
    conditions.push(Prisma.sql`p.species = ${species}`);
  }

  const size = toPrismaSize(input.size);
  if (size) {
    conditions.push(Prisma.sql`p.size = ${size}`);
  }

  if (input.featured) {
    conditions.push(Prisma.sql`p.featured = true`);
  }

  if (input.urgentOnly) {
    conditions.push(Prisma.sql`p.status = ${PetStatus.TREATMENT}`);
  }

  if (input.city?.trim()) {
    conditions.push(Prisma.sql`p.city ILIKE ${`%${input.city.trim()}%`}`);
  }

  if (input.ageGroup === "puppy") {
    conditions.push(Prisma.sql`${AGE_YEARS_SQL} < 1`);
  } else if (input.ageGroup === "adult") {
    conditions.push(Prisma.sql`${AGE_YEARS_SQL} >= 1 AND ${AGE_YEARS_SQL} < 7`);
  } else if (input.ageGroup === "senior") {
    conditions.push(Prisma.sql`${AGE_YEARS_SQL} >= 7`);
  }

  return Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`;
}

function buildOrderBySql(sort: PetSort) {
  if (sort === "urgent") {
    return Prisma.sql`(p.status = ${PetStatus.TREATMENT}) DESC, p.name ASC`;
  }

  if (sort === "age_asc") {
    return Prisma.sql`${AGE_YEARS_SQL} ASC, p.created_at DESC`;
  }

  if (sort === "age_desc") {
    return Prisma.sql`${AGE_YEARS_SQL} DESC, p.created_at DESC`;
  }

  if (sort === "name_asc") {
    return Prisma.sql`p.name ASC`;
  }

  return Prisma.sql`p.created_at DESC`;
}

export async function listPets(
  input: ListPetsInput,
): Promise<PetsListResponse> {
  const limit = Math.min(input.limit ?? 12, 24);
  const requestedPage = Math.max(1, input.page ?? 1);

  const sort: PetSort =
    input.sort && SORT_VALUES.includes(input.sort as PetSort)
      ? (input.sort as PetSort)
      : "recent";

  const whereSql = buildWhereSql(input);
  const orderBySql = buildOrderBySql(sort);

  const countRows = await prisma.$queryRaw<{ total: number }[]>`
    SELECT COUNT(*)::int AS total
    FROM public.pets p
    ${whereSql}
  `;

  const total = countRows[0]?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(requestedPage, totalPages);
  const offset = (page - 1) * limit;

  const rows = await prisma.$queryRaw<PetRow[]>`
    SELECT
      p.id,
      p.name,
      p.species,
      p.size,
      ${AGE_YEARS_SQL} AS age_years,
      p.city,
      p.state,
      p.description,
      p.vaccinated,
      p.castrated,
      p.status,
      (
        SELECT pm.url
        FROM public.pet_media pm
        WHERE pm.pet_id = p.id
        ORDER BY pm.is_main DESC, pm.sort_order ASC, pm.created_at ASC
        LIMIT 1
      ) AS main_image_url
    FROM public.pets p
    ${whereSql}
    ORDER BY ${orderBySql}
    OFFSET ${offset}
    LIMIT ${limit}
  `;

  const items = rows.map<Pet>((pet) => {
    const ageYears = Number(pet.age_years) || 1;
    const fallbackImage = `https://placehold.co/400x400.png?text=${encodeURIComponent(pet.name)}`;

    return {
      id: pet.id,
      name: pet.name,
      species: fromPrismaSpecies(pet.species),
      size: fromPrismaSize(pet.size),
      ageYears,
      ageGroup: toAgeGroup(ageYears),
      city: pet.city ?? "Nao informado",
      state: pet.state ?? "NA",
      imageUrl: pet.main_image_url ?? fallbackImage,
      descriptionShort: pet.description ?? "Sem descricao.",
      tags: toTags({
        vaccinated: pet.vaccinated,
        castrated: pet.castrated,
        status: pet.status,
      }),
    };
  });

  return {
    items,
    total,
    page,
    totalPages,
  };
}
