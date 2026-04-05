"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ADMIN_ROUTES } from "@/constants";
import {
  useCreatePetMutation,
  useDeletePetMutation,
  useUpdatePetMutation,
} from "@/features/dashboard/pets/hooks/usePetMutations";
import messages from "@/messages/pt-br.json";
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
import type { PetAdminRecord, PetFormValues } from "@/types";

import { petFormSchema } from "../schemas/pet-form.schema";
import { buildPetFormDefaults } from "../utils/pet-form.utils";

const dashboardMessages = messages.dashboard;
const formMessages = dashboardMessages.petEdit.form;

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
