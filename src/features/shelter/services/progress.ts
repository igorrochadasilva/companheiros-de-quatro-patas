import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { ShelterProgress } from "@/types";

export async function fetchShelterProgress(): Promise<ShelterProgress> {
  return apiGet<ShelterProgress>(API_ROUTES.shelterProgress);
}
