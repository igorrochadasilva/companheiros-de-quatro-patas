"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

type QueryClientProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function AppQueryClientProvider({ children }: QueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
