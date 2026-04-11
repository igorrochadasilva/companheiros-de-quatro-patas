"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStats } from "@/features/about/services/stats";

export function useStats() {
  return useQuery({
    queryKey: ["about-stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60,
  });
}
