"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAdoptionCmsContent } from "@/features/adoption/services/cms";

export function useAdoptionCmsContent() {
  return useQuery({
    queryKey: ["adoption-cms-content"],
    queryFn: fetchAdoptionCmsContent,
    staleTime: 1000 * 60 * 5,
  });
}
