import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { Pet, PetFilters } from "@/types";

export type FeaturedPetsResponse = {
  items: Pet[];
};

export async function fetchFeaturedPets(
  filters: PetFilters,
): Promise<FeaturedPetsResponse> {
  const params: Record<string, string | number | boolean | undefined> = {
    featured: 1,
    limit: 12,
  };
  if (filters.species) params.species = filters.species;
  if (filters.size) params.size = filters.size;
  if (filters.ageGroup) params.ageGroup = filters.ageGroup;
  if (filters.city) params.city = filters.city;
  if (filters.urgentOnly) params.urgentOnly = true;

  return apiGet<FeaturedPetsResponse>(API_ROUTES.pets, { params });
}
