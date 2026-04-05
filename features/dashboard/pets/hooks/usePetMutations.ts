"use client";

import { useMutation } from "@tanstack/react-query";

import {
  createPetAdmin,
  deletePetAdmin,
  updatePetAdmin,
} from "@/features/dashboard/pets/services/petsAdmin";
import type {
  DeletePetResponse,
  PetFormValues,
  UpsertPetResponse,
} from "@/types";

export function useCreatePetMutation() {
  return useMutation<UpsertPetResponse, Error, PetFormValues>({
    mutationFn: createPetAdmin,
  });
}

export function useUpdatePetMutation(petId: string) {
  return useMutation<UpsertPetResponse, Error, PetFormValues>({
    mutationFn: (payload) => updatePetAdmin(petId, payload),
  });
}

export function useDeletePetMutation(petId: string) {
  return useMutation<DeletePetResponse, Error, void>({
    mutationFn: () => deletePetAdmin(petId),
  });
}
