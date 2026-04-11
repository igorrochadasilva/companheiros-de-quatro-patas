"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStats } from "@/features/donatation/services/stats";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60,
  });
}
