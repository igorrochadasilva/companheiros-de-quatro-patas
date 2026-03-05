import { NextRequest, NextResponse } from "next/server";

import type { Pet, PetAgeGroup, PetSize, PetSort, PetSpecies } from "@/types";

const mockPets: Pet[] = [
  {
    id: "pet-1",
    name: "Luna",
    species: "dog",
    size: "medium",
    ageYears: 2,
    ageGroup: "adult",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://placehold.co/400x400.png?text=Luna",
    descriptionShort: "Dócil, vacinada e castrada. Adora crianças.",
    tags: ["vaccinated", "neutered"],
  },
  {
    id: "pet-2",
    name: "Mingau",
    species: "cat",
    size: "small",
    ageYears: 1,
    ageGroup: "adult",
    city: "Guarulhos",
    state: "SP",
    imageUrl: "https://placehold.co/400x400.png?text=Mingau",
    descriptionShort: "Gatinho carinhoso, perfeito para apartamento.",
    tags: ["vaccinated"],
  },
  {
    id: "pet-3",
    name: "Thor",
    species: "dog",
    size: "large",
    ageYears: 4,
    ageGroup: "adult",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://placehold.co/400x400.png?text=Thor",
    descriptionShort: "Calmo e companheiro. Ideal para casa com quintal.",
    tags: ["vaccinated", "neutered"],
  },
  {
    id: "pet-4",
    name: "Nina",
    species: "cat",
    size: "small",
    ageYears: 0.5,
    ageGroup: "puppy",
    city: "Osasco",
    state: "SP",
    imageUrl: "https://placehold.co/400x400.png?text=Nina",
    descriptionShort: "Filhote brincalhona, muito carinhosa.",
    tags: ["vaccinated", "urgent"],
  },
  {
    id: "pet-5",
    name: "Rex",
    species: "dog",
    size: "medium",
    ageYears: 5,
    ageGroup: "senior",
    city: "Guarulhos",
    state: "SP",
    imageUrl: "https://placehold.co/400x400.png?text=Rex",
    descriptionShort: "Idoso tranquilo, busca um lar acolhedor.",
    tags: ["vaccinated", "neutered", "urgent"],
  },
  {
    id: "pet-6",
    name: "Mel",
    species: "dog",
    size: "small",
    ageYears: 1,
    ageGroup: "adult",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://placehold.co/400x400.png?text=Mel",
    descriptionShort: "Energética e amável. Adora passeios.",
    tags: ["vaccinated", "neutered"],
  },
];

const SORT_VALUES: PetSort[] = [
  "recent",
  "urgent",
  "age_asc",
  "age_desc",
  "name_asc",
];

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
    )
      return false;
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
      return list; // recent: keep original order
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const species = searchParams.get("species") as PetSpecies | null;
  const size = searchParams.get("size") as PetSize | null;
  const ageGroup = searchParams.get("ageGroup") as PetAgeGroup | null;
  const city = searchParams.get("city") ?? null;
  const urgentOnly = searchParams.get("urgentOnly") === "1";
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 24);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sortParam = searchParams.get("sort");
  const sort: PetSort =
    sortParam && SORT_VALUES.includes(sortParam as PetSort)
      ? (sortParam as PetSort)
      : "recent";

  const filters = {
    species: species ?? undefined,
    size: size ?? undefined,
    ageGroup: ageGroup ?? undefined,
    city: city ?? undefined,
    urgentOnly,
  };

  const filtered = filterPets(mockPets, filters);
  const sorted = sortPets(filtered, sort);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * limit;
  const items = sorted.slice(start, start + limit);

  return NextResponse.json({
    items,
    total,
    page: pageSafe,
    totalPages,
  });
}
