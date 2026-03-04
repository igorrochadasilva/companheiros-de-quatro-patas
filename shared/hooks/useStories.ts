"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStories } from "@/shared/services/stories";

export function useStories() {
  return useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
    staleTime: 1000 * 60, // 1 min
  });
}
