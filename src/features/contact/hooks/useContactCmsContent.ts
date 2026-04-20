"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchContactCmsContent } from "@/features/contact/services/cms";

export function useContactCmsContent() {
  return useQuery({
    queryKey: ["contact-cms-content"],
    queryFn: fetchContactCmsContent,
    staleTime: 1000 * 60 * 5,
  });
}

