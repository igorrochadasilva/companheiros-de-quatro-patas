"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_ROUTES } from "@/constants";
import {
  useDeletePetMediaMutation,
  useSetPetMediaMainMutation,
  useUploadPetMediaMutation,
} from "@/features/dashboard/pets/hooks/usePetMediaMutations";
import {
  useCreatePetMutation,
  useDeletePetMutation,
  useUpdatePetMutation,
} from "@/features/dashboard/pets/hooks/usePetMutations";
import { dashboardMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import type {
  PetAdminRecord,
  PetFormValues,
  PetMediaAdminRecord,
} from "@/types";

import { petFormSchema } from "../schemas/pet-form.schema";
import { buildPetFormDefaults } from "../utils/pet-form.utils";
const formMessages = dashboardMessages.petEdit.form;
const mediaMessages = dashboardMessages.petEdit.media;
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const resolver = zodResolver(petFormSchema as never) as Resolver<PetFormValues>;

type DashboardPetUpsertFormProps = {
  mode: "create" | "edit";
  pet?: PetAdminRecord;
};

export function DashboardPetUpsertForm({
  mode,
  pet,
}: DashboardPetUpsertFormProps) {
  const router = useRouter();
  const createPetMutation = useCreatePetMutation();
  const updatePetMutation = useUpdatePetMutation(pet?.id ?? "");
  const deletePetMutation = useDeletePetMutation(pet?.id ?? "");
  const uploadPetMediaMutation = useUploadPetMediaMutation(pet?.id ?? "");
  const setPetMediaMainMutation = useSetPetMediaMainMutation();
  const deletePetMediaMutation = useDeletePetMediaMutation();
  const [mediaItems, setMediaItems] = useState<PetMediaAdminRecord[]>(
    pet?.media ?? [],
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    resolver,
    defaultValues: buildPetFormDefaults(pet),
  });

  async function onSubmit(values: PetFormValues) {
    const mutation = mode === "create" ? createPetMutation : updatePetMutation;
    const data = await mutation.mutateAsync(values).catch(() => null);
    if (!data) {
      toast.error(formMessages.error);
      return;
    }

    toast.success(
      mode === "create" ? formMessages.createSuccess : formMessages.success,
    );

    if (mode === "create") {
      router.push(ADMIN_ROUTES.petDetail(data.id));
      router.refresh();
      return;
    }

    router.refresh();
  }

  const sortedMedia = useMemo(
    () =>
      [...mediaItems].sort((a, b) => {
        if (a.isMain === b.isMain) return a.sortOrder - b.sortOrder;
        return a.isMain ? -1 : 1;
      }),
    [mediaItems],
  );

  async function onUploadMedia(files: FileList | null) {
    if (!pet?.id || !files?.length) return;

    const nextFiles = Array.from(files);
    for (const [index, file] of nextFiles.entries()) {
      if (
        !ACCEPTED_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
        )
      ) {
        toast.error(mediaMessages.invalidType);
        continue;
      }

      if (file.size > MAX_UPLOAD_SIZE) {
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

  async function onDelete() {
    if (!pet?.id) return;

    const confirmed = window.confirm(formMessages.deleteConfirm);
    if (!confirmed) return;

    const result = await deletePetMutation.mutateAsync().catch(() => null);
    if (!result?.ok) {
      toast.error(formMessages.deleteError);
      return;
    }

    toast.success(formMessages.deleteSuccess);
    router.push(ADMIN_ROUTES.pets);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border p-4"
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{formMessages.name}</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="externalId">{formMessages.externalId}</Label>
          <Input id="externalId" {...register("externalId")} />
        </div>

        <div className="space-y-2">
          <Label>{formMessages.species}</Label>
          <Controller
            control={control}
            name="species"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={!!errors.species}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOG">
                    {dashboardMessages.petEdit.speciesValues.DOG}
                  </SelectItem>
                  <SelectItem value="CAT">
                    {dashboardMessages.petEdit.speciesValues.CAT}
                  </SelectItem>
                  <SelectItem value="OTHER">
                    {dashboardMessages.petEdit.speciesValues.OTHER}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="breed">{formMessages.breed}</Label>
          <Input id="breed" {...register("breed")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">{formMessages.age}</Label>
          <Input id="age" {...register("age")} />
        </div>

        <div className="space-y-2">
          <Label>{formMessages.size}</Label>
          <Controller
            control={control}
            name="size"
            render={({ field }) => (
              <Select
                value={field.value ?? "__none__"}
                onValueChange={(value) =>
                  field.onChange(value === "__none__" ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={formMessages.notInformed} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">
                    {formMessages.notInformed}
                  </SelectItem>
                  <SelectItem value="SMALL">
                    {dashboardMessages.petEdit.sizeValues.SMALL}
                  </SelectItem>
                  <SelectItem value="MEDIUM">
                    {dashboardMessages.petEdit.sizeValues.MEDIUM}
                  </SelectItem>
                  <SelectItem value="LARGE">
                    {dashboardMessages.petEdit.sizeValues.LARGE}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>{formMessages.gender}</Label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                value={field.value ?? "__none__"}
                onValueChange={(value) =>
                  field.onChange(value === "__none__" ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={formMessages.notInformed} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">
                    {formMessages.notInformed}
                  </SelectItem>
                  <SelectItem value="MALE">
                    {dashboardMessages.petEdit.genderValues.MALE}
                  </SelectItem>
                  <SelectItem value="FEMALE">
                    {dashboardMessages.petEdit.genderValues.FEMALE}
                  </SelectItem>
                  <SelectItem value="UNKNOWN">
                    {dashboardMessages.petEdit.genderValues.UNKNOWN}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">{formMessages.color}</Label>
          <Input id="color" {...register("color")} />
        </div>

        <div className="space-y-2">
          <Label>{formMessages.status}</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={!!errors.status}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">
                    {dashboardMessages.petEdit.statusValues.AVAILABLE}
                  </SelectItem>
                  <SelectItem value="RESERVED">
                    {dashboardMessages.petEdit.statusValues.RESERVED}
                  </SelectItem>
                  <SelectItem value="ADOPTED">
                    {dashboardMessages.petEdit.statusValues.ADOPTED}
                  </SelectItem>
                  <SelectItem value="TREATMENT">
                    {dashboardMessages.petEdit.statusValues.TREATMENT}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">{formMessages.city}</Label>
          <Input id="city" {...register("city")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">{formMessages.state}</Label>
          <Input id="state" maxLength={2} {...register("state")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{formMessages.description}</Label>
        <Textarea id="description" rows={4} {...register("description")} />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Controller
          control={control}
          name="vaccinated"
          render={({ field }) => (
            <label className="inline-flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => field.onChange(value === true)}
              />
              <span className="text-sm">{formMessages.vaccinated}</span>
            </label>
          )}
        />
        <Controller
          control={control}
          name="castrated"
          render={({ field }) => (
            <label className="inline-flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => field.onChange(value === true)}
              />
              <span className="text-sm">{formMessages.castrated}</span>
            </label>
          )}
        />
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <label className="inline-flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => field.onChange(value === true)}
              />
              <span className="text-sm">{formMessages.published}</span>
            </label>
          )}
        />
        <Controller
          control={control}
          name="featured"
          render={({ field }) => (
            <label className="inline-flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => field.onChange(value === true)}
              />
              <span className="text-sm">{formMessages.featured}</span>
            </label>
          )}
        />
      </div>

      <section className="space-y-3 rounded-lg border p-4">
        <div>
          <h3 className="text-base font-semibold">{mediaMessages.title}</h3>
          <p className="text-sm text-muted-foreground">
            {mediaMessages.subtitle}
          </p>
        </div>

        {mode === "create" || !pet?.id ? (
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
                disabled={uploadPetMediaMutation.isPending}
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
                        alt={pet.name}
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
                          disabled={setPetMediaMainMutation.isPending}
                        >
                          {mediaMessages.setMain}
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => onDeleteMedia(media.id)}
                        disabled={deletePetMediaMutation.isPending}
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

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          disabled={
            isSubmitting ||
            createPetMutation.isPending ||
            updatePetMutation.isPending
          }
        >
          {isSubmitting
            ? formMessages.saving
            : mode === "create"
              ? formMessages.create
              : formMessages.save}
        </Button>
        {mode === "edit" && pet ? (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isSubmitting || deletePetMutation.isPending}
          >
            {formMessages.delete}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
