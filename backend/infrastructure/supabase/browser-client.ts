"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicKey, requireEnv } from "@/backend/shared/env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  browserClient = createBrowserClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getSupabasePublicKey(),
  );

  return browserClient;
}
