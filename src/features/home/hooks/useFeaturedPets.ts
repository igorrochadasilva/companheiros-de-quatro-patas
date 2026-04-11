"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchFeaturedPets } from "@/features/home/services/pets";
import type { PetFilters } from "@/types";

export function useFeaturedPets(filters: PetFilters) {
  return useQuery({
    queryKey: ["featured-pets", filters],
    queryFn: () => fetchFeaturedPets(filters),
    staleTime: 1000 * 60, // 1 min
  });
}
