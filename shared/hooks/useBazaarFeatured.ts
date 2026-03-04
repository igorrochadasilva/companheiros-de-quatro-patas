"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchBazaarFeatured } from "@/shared/services/bazaar";

export interface UseBazaarFeaturedOptions {
  /** Só dispara o fetch quando true (ex.: quando a seção está visível). Default true. */
  enabled?: boolean;
}

export function useBazaarFeatured(options: UseBazaarFeaturedOptions = {}) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["bazaar-featured"],
    queryFn: fetchBazaarFeatured,
    staleTime: 1000 * 60, // 1 min
    enabled,
  });
}
