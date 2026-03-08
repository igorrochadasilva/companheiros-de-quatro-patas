import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { Stats } from "@/types";

export async function fetchStats(): Promise<Stats> {
  return apiGet<Stats>(API_ROUTES.stats);
}
