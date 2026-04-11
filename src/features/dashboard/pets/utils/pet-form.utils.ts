import type { PetAdminRecord, PetFormValues } from "@/types";

export function buildPetFormDefaults(pet?: PetAdminRecord): PetFormValues {
  return {
    externalId: pet?.externalId ?? "",
    name: pet?.name ?? "",
    species: pet?.species ?? "DOG",
    breed: pet?.breed ?? "",
    age: pet?.age ?? "",
    size: pet?.size ?? undefined,
    gender: pet?.gender ?? undefined,
    color: pet?.color ?? "",
    castrated: pet?.castrated ?? false,
    vaccinated: pet?.vaccinated ?? false,
    description: pet?.description ?? "",
    status: pet?.status ?? "AVAILABLE",
    city: pet?.city ?? "",
    state: pet?.state ?? "",
    featured: pet?.featured ?? false,
    published: pet?.published ?? true,
  };
}
