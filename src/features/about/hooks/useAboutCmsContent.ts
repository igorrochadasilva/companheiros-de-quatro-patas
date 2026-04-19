"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAboutCmsContent } from "@/features/about/services/cms";

export function useAboutCmsContent() {
  return useQuery({
    queryKey: ["about-cms-content"],
    queryFn: fetchAboutCmsContent,
    staleTime: 1000 * 60 * 5,
  });
}
