import type { Pet } from "@/types";

export function getPetCanonicalSlug(pet: Pick<Pet, "id" | "externalId">) {
  return pet.externalId ?? pet.id;
}
