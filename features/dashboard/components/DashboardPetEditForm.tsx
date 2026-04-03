"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Muted, Small } from "@/shared/ui/typography";

const dashboardMessages = messages.dashboard;
const formMessages = dashboardMessages.petEdit.form;

const PET_STATUS_VALUES = [
  "AVAILABLE",
  "RESERVED",
  "ADOPTED",
  "TREATMENT",
] as const;

type PetStatus = (typeof PET_STATUS_VALUES)[number];

type DashboardPetEditFormProps = {
  pet: {
    id: string;
    name: string;
    status: string;
    description: string | null;
    published: boolean;
    featured: boolean;
  };
};

export function DashboardPetEditForm({ pet }: DashboardPetEditFormProps) {
  const router = useRouter();
  const [name, setName] = useState(pet.name);
  const [status, setStatus] = useState<PetStatus>(
    PET_STATUS_VALUES.includes(pet.status as PetStatus)
      ? (pet.status as PetStatus)
      : "AVAILABLE",
  );
  const [description, setDescription] = useState(pet.description ?? "");
  const [published, setPublished] = useState(pet.published);
  const [featured, setFeatured] = useState(pet.featured);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`/api/pets/${pet.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          status,
          description,
          published,
          featured,
        }),
      });

      if (!response.ok) {
        setErrorMessage(formMessages.error);
        return;
      }

      setSuccessMessage(formMessages.success);
      router.refresh();
    } catch {
      setErrorMessage(formMessages.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pet-name">{formMessages.name}</Label>
          <Input
            id="pet-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            maxLength={120}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pet-status">{formMessages.status}</Label>
          <select
            id="pet-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as PetStatus)}
            className="h-9 w-full rounded-md border border-input bg-input px-3 text-sm"
          >
            <option value="AVAILABLE">
              {dashboardMessages.petEdit.statusValues.AVAILABLE}
            </option>
            <option value="RESERVED">
              {dashboardMessages.petEdit.statusValues.RESERVED}
            </option>
            <option value="ADOPTED">
              {dashboardMessages.petEdit.statusValues.ADOPTED}
            </option>
            <option value="TREATMENT">
              {dashboardMessages.petEdit.statusValues.TREATMENT}
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pet-description">{formMessages.description}</Label>
        <Textarea
          id="pet-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={4000}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2">
          <Checkbox
            checked={published}
            onCheckedChange={(value) => setPublished(value === true)}
          />
          <Small>{formMessages.published}</Small>
        </label>
        <label className="inline-flex items-center gap-2">
          <Checkbox
            checked={featured}
            onCheckedChange={(value) => setFeatured(value === true)}
          />
          <Small>{formMessages.featured}</Small>
        </label>
      </div>

      {errorMessage ? (
        <Muted className="text-destructive">{errorMessage}</Muted>
      ) : null}
      {successMessage ? (
        <Muted className="text-emerald-700">{successMessage}</Muted>
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? formMessages.saving : formMessages.save}
      </Button>
    </form>
  );
}
