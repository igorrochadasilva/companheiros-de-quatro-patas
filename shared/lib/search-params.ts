import type { PetFilters } from "@/types";

export function parsePetFiltersFromSearchParams(
  searchParams: URLSearchParams,
): PetFilters {
  const species = searchParams.get("species") as PetFilters["species"];
  const size = searchParams.get("size") as PetFilters["size"];
  const ageGroup = searchParams.get("ageGroup") as PetFilters["ageGroup"];
  const city = searchParams.get("city") ?? undefined;
  const urgentOnly = searchParams.get("urgentOnly") === "1";

  return {
    species: species ?? undefined,
    size: size ?? undefined,
    ageGroup: ageGroup ?? undefined,
    city,
    urgentOnly,
  };
}

export function toPetFiltersSearchParams(filters: PetFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.species) params.set("species", filters.species);
  if (filters.size) params.set("size", filters.size);
  if (filters.ageGroup) params.set("ageGroup", filters.ageGroup);
  if (filters.city) params.set("city", filters.city);
  if (filters.urgentOnly) params.set("urgentOnly", "1");

  return params;
}
