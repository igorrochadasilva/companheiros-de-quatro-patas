"use client";

import { useMutation } from "@tanstack/react-query";

import {
  deletePetMediaAdmin,
  setPetMediaAsMain,
  uploadPetMedia,
} from "@/features/dashboard/pets/services/petMediaAdmin";
import type { PetMediaAdminRecord } from "@/types";

export function useUploadPetMediaMutation(petId: string) {
  return useMutation<
    PetMediaAdminRecord,
    Error,
    { file: File; sortOrder: number; isMain: boolean }
  >({
    mutationFn: ({ file, sortOrder, isMain }) =>
      uploadPetMedia(petId, file, sortOrder, isMain),
  });
}

export function useSetPetMediaMainMutation() {
  return useMutation<PetMediaAdminRecord, Error, { mediaId: string }>({
    mutationFn: ({ mediaId }) => setPetMediaAsMain(mediaId),
  });
}

export function useDeletePetMediaMutation() {
  return useMutation<{ ok: boolean }, Error, { mediaId: string }>({
    mutationFn: ({ mediaId }) => deletePetMediaAdmin(mediaId),
  });
}
