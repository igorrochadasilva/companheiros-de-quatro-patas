import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { TransparencySummary } from "@/types";

export async function fetchTransparencySummary(): Promise<TransparencySummary> {
  return apiGet<TransparencySummary>(API_ROUTES.transparencySummary);
}
