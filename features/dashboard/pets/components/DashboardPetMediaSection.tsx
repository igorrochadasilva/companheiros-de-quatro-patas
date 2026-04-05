"use client";

import Image from "next/image";

import { dashboardMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import type { PetMediaAdminRecord } from "@/types";

type DashboardPetMediaSectionProps = {
  mode: "create" | "edit";
  petId?: string;
  petName: string;
  sortedMedia: PetMediaAdminRecord[];
  isDeleting: boolean;
  isReordering: boolean;
  isSettingMain: boolean;
  isUploading: boolean;
  onDeleteMedia: (mediaId: string) => Promise<void>;
  onMoveMedia: (mediaId: string, direction: -1 | 1) => Promise<void>;
  onSetMainMedia: (mediaId: string) => Promise<void>;
  onUploadMedia: (files: FileList | null) => Promise<void>;
};

const mediaMessages = dashboardMessages.petEdit.media;

export function DashboardPetMediaSection({
  mode,
  petId,
  petName,
  sortedMedia,
  isDeleting,
  isReordering,
  isSettingMain,
  isUploading,
  onDeleteMedia,
  onMoveMedia,
  onSetMainMedia,
  onUploadMedia,
}: DashboardPetMediaSectionProps) {
  return (
    <section className="space-y-3 rounded-lg border p-4">
      <div>
        <h3 className="text-base font-semibold">{mediaMessages.title}</h3>
        <p className="text-sm text-muted-foreground">
          {mediaMessages.subtitle}
        </p>
      </div>

      {mode === "create" || !petId ? (
        <p className="text-sm text-muted-foreground">
          {mediaMessages.createHint}
        </p>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="pet-media-upload">
              {mediaMessages.uploadLabel}
            </Label>
            <Input
              id="pet-media-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(event) => onUploadMedia(event.target.files)}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              {mediaMessages.uploadHint}
            </p>
          </div>

          {sortedMedia.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {mediaMessages.uploadEmpty}
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sortedMedia.map((media) => (
                <article
                  key={media.id}
                  className="space-y-2 rounded-md border p-2"
                >
                  <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={media.url}
                      alt={petName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {media.isMain ? (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {mediaMessages.mainBadge}
                      </span>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onSetMainMedia(media.id)}
                        disabled={isSettingMain}
                      >
                        {mediaMessages.setMain}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onMoveMedia(media.id, -1)}
                      disabled={isReordering || sortedMedia[0]?.id === media.id}
                    >
                      {mediaMessages.moveUp}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onMoveMedia(media.id, 1)}
                      disabled={
                        isReordering ||
                        sortedMedia[sortedMedia.length - 1]?.id === media.id
                      }
                    >
                      {mediaMessages.moveDown}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteMedia(media.id)}
                      disabled={isDeleting}
                    >
                      {mediaMessages.delete}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
