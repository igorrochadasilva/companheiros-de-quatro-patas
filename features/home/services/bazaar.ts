import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { BazaarItem } from "@/types";

export type BazaarFeaturedResponse = {
  items: BazaarItem[];
};

export async function fetchBazaarFeatured(): Promise<BazaarFeaturedResponse> {
  return apiGet<BazaarFeaturedResponse>(API_ROUTES.bazaarFeatured);
}
