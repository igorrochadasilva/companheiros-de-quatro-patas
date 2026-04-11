import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { HomeCmsContent } from "@/types";

export async function fetchHomeCmsContent(): Promise<HomeCmsContent> {
  return apiGet<HomeCmsContent>(API_ROUTES.homeCms);
}
