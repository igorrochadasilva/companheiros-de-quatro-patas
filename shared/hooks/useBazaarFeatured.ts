"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchBazaarFeatured } from "@/shared/services/bazaar";

export function useBazaarFeatured() {
  return useQuery({
    queryKey: ["bazaar-featured"],
    queryFn: fetchBazaarFeatured,
    staleTime: 1000 * 60, // 1 min
  });
}
