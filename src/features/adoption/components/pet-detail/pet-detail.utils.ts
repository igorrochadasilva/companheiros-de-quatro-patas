import { WHATSAPP_URL } from "@/constants";
import { adoptionMessages } from "@/messages";

export function formatSpecies(species: "DOG" | "CAT" | "OTHER") {
  if (species === "DOG") return adoptionMessages.petDetail.species.dog;
  if (species === "CAT") return adoptionMessages.petDetail.species.cat;
  return adoptionMessages.petDetail.species.other;
}

export function formatSize(size: "SMALL" | "MEDIUM" | "LARGE" | null) {
  if (size === "SMALL") return adoptionMessages.petDetail.size.small;
  if (size === "LARGE") return adoptionMessages.petDetail.size.large;
  return adoptionMessages.petDetail.size.medium;
}

export function buildPetWhatsappUrl(input: {
  petId: string;
  petName: string;
  petUrl: string;
}) {
  const text = adoptionMessages.petDetail.whatsappMessage
    .replace("{name}", input.petName)
    .replace("{id}", input.petId)
    .replace("{url}", input.petUrl);

  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
