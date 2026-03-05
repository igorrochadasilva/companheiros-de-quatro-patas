"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTransparencySummary } from "@/features/home/services/transparency";

export interface UseTransparencySummaryOptions {
  /** Só dispara o fetch quando true (ex.: quando a seção está visível). Default true. */
  enabled?: boolean;
}

export function useTransparencySummary(
  options: UseTransparencySummaryOptions = {},
) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["transparency-summary"],
    queryFn: fetchTransparencySummary,
    staleTime: 1000 * 60, // 1 min
    enabled,
  });
}
