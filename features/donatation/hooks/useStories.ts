"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStories } from "@/features/donatation/services/stories";

export interface UseStoriesOptions {
  enabled?: boolean;
}

export function useStories(options: UseStoriesOptions = {}) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
    staleTime: 1000 * 60,
    enabled,
  });
}
