"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchShelterProgress } from "@/features/shelter/services/progress";

export interface UseShelterProgressOptions {
  enabled?: boolean;
}

export function useShelterProgress(options: UseShelterProgressOptions = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: ["shelter-progress"],
    queryFn: fetchShelterProgress,
    staleTime: 1000 * 60,
    enabled,
  });
}
