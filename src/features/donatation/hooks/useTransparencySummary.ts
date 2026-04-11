"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTransparencySummary } from "@/features/donatation/services/transparency";

export interface UseTransparencySummaryOptions {
  enabled?: boolean;
}

export function useTransparencySummary(
  options: UseTransparencySummaryOptions = {},
) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["transparency-summary"],
    queryFn: fetchTransparencySummary,
    staleTime: 1000 * 60,
    enabled,
  });
}
