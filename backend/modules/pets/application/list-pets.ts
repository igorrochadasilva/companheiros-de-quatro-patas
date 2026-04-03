import "server-only";

import { petsMock } from "@/backend/mock/pets";
import type { Pet, PetAgeGroup, PetSize, PetSort, PetSpecies } from "@/types";

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

function filterPets(
  pets: Pet[],
  filters: {
    species?: PetSpecies;
    size?: PetSize;
    ageGroup?: PetAgeGroup;
    city?: string;
    urgentOnly?: boolean;
  },
): Pet[] {
  return pets.filter((pet) => {
    if (filters.species && pet.species !== filters.species) return false;
    if (filters.size && pet.size !== filters.size) return false;
    if (filters.ageGroup && pet.ageGroup !== filters.ageGroup) return false;
    if (
      filters.city &&
      !pet.city.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }
    if (filters.urgentOnly && !pet.tags.includes("urgent")) return false;
    return true;
  });
}

function sortPets(pets: Pet[], sort: PetSort): Pet[] {
  const list = [...pets];
  switch (sort) {
    case "urgent":
      return list.sort((a, b) => {
        const aUrgent = a.tags.includes("urgent") ? 1 : 0;
        const bUrgent = b.tags.includes("urgent") ? 1 : 0;
        return bUrgent - aUrgent;
      });
    case "age_asc":
      return list.sort((a, b) => a.ageYears - b.ageYears);
    case "age_desc":
      return list.sort((a, b) => b.ageYears - a.ageYears);
    case "name_asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
}

export async function listPets(
  input: ListPetsInput,
): Promise<PetsListResponse> {
  const limit = Math.min(input.limit ?? 12, 24);
  const page = Math.max(1, input.page ?? 1);

  const sort: PetSort =
    input.sort && SORT_VALUES.includes(input.sort as PetSort)
      ? (input.sort as PetSort)
      : "recent";

  const filtered = filterPets(petsMock, {
    species: input.species,
    size: input.size,
    ageGroup: input.ageGroup,
    city: input.city,
    urgentOnly: input.urgentOnly,
  });

  const sorted = sortPets(filtered, sort);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * limit;

  return {
    items: sorted.slice(start, start + limit),
    total,
    page: pageSafe,
    totalPages,
  };
}
