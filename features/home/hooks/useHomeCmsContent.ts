"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchHomeCmsContent } from "@/features/home/services/cms";

export function useHomeCmsContent() {
  return useQuery({
    queryKey: ["home-cms-content"],
    queryFn: fetchHomeCmsContent,
    staleTime: 1000 * 60 * 5,
  });
}
