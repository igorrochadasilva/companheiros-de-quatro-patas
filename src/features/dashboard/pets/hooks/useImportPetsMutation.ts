"use client";

import { useMutation } from "@tanstack/react-query";

import { importPetsAdmin } from "@/features/dashboard/pets/services/petsImport";
import type { PetImportRequest, PetImportResponse } from "@/types";

export function useImportPetsMutation() {
  return useMutation<PetImportResponse, Error, PetImportRequest>({
    mutationFn: importPetsAdmin,
  });
}
