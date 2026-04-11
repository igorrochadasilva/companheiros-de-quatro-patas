import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { AdoptionCmsContent } from "@/types";

export async function fetchAdoptionCmsContent(): Promise<AdoptionCmsContent> {
  return apiGet<AdoptionCmsContent>(API_ROUTES.adoptionCms);
}
