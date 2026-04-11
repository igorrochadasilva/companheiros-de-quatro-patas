import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { Pet, PetFilters, PetSort } from "@/types";

export type PetsListResponse = {
  items: Pet[];
  total: number;
  page: number;
  totalPages: number;
};

const DEFAULT_LIMIT = 12;

export async function fetchPets(
  filters: PetFilters,
  page: number,
  sort: PetSort,
  limit: number = DEFAULT_LIMIT,
): Promise<PetsListResponse> {
  const params: Record<string, string | number | boolean | undefined> = {
    page,
    limit,
    sort,
  };
  if (filters.species) params.species = filters.species;
  if (filters.size) params.size = filters.size;
  if (filters.ageGroup) params.ageGroup = filters.ageGroup;
  if (filters.city) params.city = filters.city;
  if (filters.urgentOnly) params.urgentOnly = true;

  return apiGet<PetsListResponse>(API_ROUTES.pets, { params });
}
