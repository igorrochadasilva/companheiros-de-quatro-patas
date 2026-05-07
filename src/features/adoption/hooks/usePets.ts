"use client";

import { useQuery } from "@tanstack/react-query";

import {
  fetchPets,
  type PetsListResponse,
} from "@/features/adoption/services/pets";
import type { PetFilters, PetSort } from "@/types";

const DEFAULT_LIMIT = 12;

type UsePetsOptions = {
  enabled?: boolean;
  initialData?: PetsListResponse;
};

export function usePets(
  filters: PetFilters,
  page: number,
  sort: PetSort,
  options?: UsePetsOptions,
) {
  return useQuery({
    queryKey: ["pets", filters, page, sort],
    queryFn: () => fetchPets(filters, page, sort, DEFAULT_LIMIT),
    staleTime: 1000 * 60, // 1 min
    enabled: options?.enabled,
    initialData: options?.initialData,
  });
}
