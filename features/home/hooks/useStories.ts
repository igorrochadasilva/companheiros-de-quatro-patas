"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStories } from "@/features/home/services/stories";

export interface UseStoriesOptions {
  /** Só dispara o fetch quando true (ex.: quando a seção está visível). Default true. */
  enabled?: boolean;
}

export function useStories(options: UseStoriesOptions = {}) {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
    staleTime: 1000 * 60, // 1 min
    enabled,
  });
}
