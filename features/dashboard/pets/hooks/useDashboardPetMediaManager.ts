"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { dashboardMessages } from "@/messages";
import type { PetMediaAdminRecord } from "@/types";

import {
  ACCEPTED_PET_IMAGE_TYPES,
  MAX_PET_MEDIA_UPLOAD_SIZE,
} from "../constants/pet-media";
import {
  useDeletePetMediaMutation,
  useReorderPetMediaMutation,
  useSetPetMediaMainMutation,
  useUploadPetMediaMutation,
} from "./usePetMediaMutations";

type UseDashboardPetMediaManagerParams = {
  petId?: string;
  initialMedia?: PetMediaAdminRecord[];
};

const mediaMessages = dashboardMessages.petEdit.media;

export function useDashboardPetMediaManager({
  petId,
  initialMedia = [],
}: UseDashboardPetMediaManagerParams) {
  const router = useRouter();
  const uploadPetMediaMutation = useUploadPetMediaMutation(petId ?? "");
  const setPetMediaMainMutation = useSetPetMediaMainMutation();
  const deletePetMediaMutation = useDeletePetMediaMutation();
  const reorderPetMediaMutation = useReorderPetMediaMutation();
  const [mediaItems, setMediaItems] =
    useState<PetMediaAdminRecord[]>(initialMedia);

  useEffect(() => {
    setMediaItems(initialMedia);
  }, [initialMedia]);

  const sortedMedia = useMemo(
    () => [...mediaItems].sort((a, b) => a.sortOrder - b.sortOrder),
    [mediaItems],
  );

  async function onUploadMedia(files: FileList | null) {
    if (!petId || !files?.length) return;

    const nextFiles = Array.from(files);
    for (const [index, file] of nextFiles.entries()) {
      if (
        !ACCEPTED_PET_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_PET_IMAGE_TYPES)[number],
        )
      ) {
        toast.error(mediaMessages.invalidType);
        continue;
      }

      if (file.size > MAX_PET_MEDIA_UPLOAD_SIZE) {
        toast.error(mediaMessages.maxSizeError);
        continue;
      }

      const created = await uploadPetMediaMutation
        .mutateAsync({
          file,
          sortOrder: mediaItems.length + index + 1,
          isMain: mediaItems.length === 0 && index === 0,
        })
        .catch(() => null);

      if (!created) {
        toast.error(mediaMessages.uploadError);
        continue;
      }

      setMediaItems((current) => [...current, created]);
      toast.success(mediaMessages.uploadSuccess);
    }

    router.refresh();
  }

  async function onSetMainMedia(mediaId: string) {
    const updated = await setPetMediaMainMutation
      .mutateAsync({ mediaId })
      .catch(() => null);

    if (!updated) {
      toast.error(mediaMessages.setMainError);
      return;
    }

    setMediaItems((current) =>
      current.map((item) => ({
        ...item,
        isMain: item.id === updated.id,
      })),
    );
    toast.success(mediaMessages.setMainSuccess);
    router.refresh();
  }

  async function onDeleteMedia(mediaId: string) {
    const result = await deletePetMediaMutation
      .mutateAsync({ mediaId })
      .catch(() => null);

    if (!result?.ok) {
      toast.error(mediaMessages.deleteError);
      return;
    }

    setMediaItems((current) => current.filter((item) => item.id !== mediaId));
    toast.success(mediaMessages.deleteSuccess);
    router.refresh();
  }

  async function onMoveMedia(mediaId: string, direction: -1 | 1) {
    const ordered = [...sortedMedia];
    const currentIndex = ordered.findIndex((item) => item.id === mediaId);
    if (currentIndex < 0) return;

    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= ordered.length) return;

    const nextOrdered = [...ordered];
    const [moved] = nextOrdered.splice(currentIndex, 1);
    nextOrdered.splice(targetIndex, 0, moved);

    const normalized = nextOrdered.map((item, index) => ({
      ...item,
      sortOrder: index,
    }));

    setMediaItems(normalized);

    const result = await reorderPetMediaMutation
      .mutateAsync({
        items: normalized.map((item) => ({
          mediaId: item.id,
          sortOrder: item.sortOrder,
        })),
      })
      .catch(() => null);

    if (!result) {
      toast.error(mediaMessages.reorderError);
      router.refresh();
      return;
    }

    toast.success(mediaMessages.reorderSuccess);
    router.refresh();
  }

  return {
    sortedMedia,
    onDeleteMedia,
    onMoveMedia,
    onSetMainMedia,
    onUploadMedia,
    isUploading: uploadPetMediaMutation.isPending,
    isDeleting: deletePetMediaMutation.isPending,
    isSettingMain: setPetMediaMainMutation.isPending,
    isReordering: reorderPetMediaMutation.isPending,
  };
}
