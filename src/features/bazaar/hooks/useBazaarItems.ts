"use client";

import { useQuery } from "@tanstack/react-query";

import {
  fetchBazaarItems,
  type FetchBazaarItemsParams,
} from "@/features/bazaar/services/fetchBazaarItems";

export function useBazaarItems(params: FetchBazaarItemsParams) {
  return useQuery({
    queryKey: ["bazaar-items", params],
    queryFn: () => fetchBazaarItems(params),
    staleTime: 1000 * 30,
  });
}
