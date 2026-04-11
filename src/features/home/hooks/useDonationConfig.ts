"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchDonationConfig } from "@/features/home/services/donations";

export interface UseDonationConfigOptions {
  enabled?: boolean;
}

export function useDonationConfig(options: UseDonationConfigOptions = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: ["donation-config"],
    queryFn: fetchDonationConfig,
    staleTime: 1000 * 60,
    enabled,
  });
}
