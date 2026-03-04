"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTransparencySummary } from "@/shared/services/transparency";

export function useTransparencySummary() {
  return useQuery({
    queryKey: ["transparency-summary"],
    queryFn: fetchTransparencySummary,
    staleTime: 1000 * 60, // 1 min
  });
}
