import { API_ROUTES } from "@/constants";
import { apiPost } from "@/shared/lib/api";
import type { PetImportRequest, PetImportResponse } from "@/types";

export function importPetsAdmin(
  payload: PetImportRequest,
): Promise<PetImportResponse> {
  return apiPost<PetImportResponse>(API_ROUTES.petsImport, payload);
}
