import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { DonationConfig } from "@/types";

export async function fetchDonationConfig(): Promise<DonationConfig> {
  return apiGet<DonationConfig>(API_ROUTES.donationsConfig);
}
