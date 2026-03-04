"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStats } from "@/shared/services/stats";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60, // 1 min
  });
}
