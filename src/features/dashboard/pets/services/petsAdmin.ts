import { API_ROUTES } from "@/constants";
import { apiDelete, apiPatch, apiPost } from "@/shared/lib/api";
import type {
  DeletePetResponse,
  PetFormValues,
  UpsertPetResponse,
} from "@/types";

export async function createPetAdmin(
  payload: PetFormValues,
): Promise<UpsertPetResponse> {
  return apiPost<UpsertPetResponse>(API_ROUTES.pets, payload);
}

export async function updatePetAdmin(
  petId: string,
  payload: PetFormValues,
): Promise<UpsertPetResponse> {
  return apiPatch<UpsertPetResponse>(`${API_ROUTES.pets}/${petId}`, payload);
}

export async function deletePetAdmin(
  petId: string,
): Promise<DeletePetResponse> {
  return apiDelete<DeletePetResponse>(`${API_ROUTES.pets}/${petId}`);
}
