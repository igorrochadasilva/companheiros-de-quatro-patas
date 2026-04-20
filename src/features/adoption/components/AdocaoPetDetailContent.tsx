import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { getPublicPetById } from "@/backend/modules/pets/application/get-public-pet-by-id";
import { PUBLIC_ROUTES, WHATSAPP_URL } from "@/constants";
import { adoptionMessages } from "@/messages";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { H1, Muted, Typography } from "@/shared/ui/typography";

type AdocaoPetDetailContentProps = {
  slug: string;
};

function formatSpecies(species: "DOG" | "CAT" | "OTHER") {
  if (species === "DOG") return "Cachorro";
  if (species === "CAT") return "Gato";
  return "Outro";
}

function formatSize(size: "SMALL" | "MEDIUM" | "LARGE" | null) {
  if (size === "SMALL") return "Pequeno";
  if (size === "LARGE") return "Grande";
  return "Medio";
}

function buildPetWhatsappUrl(input: {
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

export async function AdocaoPetDetailContent({
  slug,
}: AdocaoPetDetailContentProps) {
  const pet = await getPublicPetById(slug);

  if (!pet) {
    return (
      <section className="space-y-4">
        <H1 className="text-2xl">{adoptionMessages.petDetail.notFoundTitle}</H1>
        <Muted>{adoptionMessages.petDetail.notFoundDescription}</Muted>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.adoption}>
            {adoptionMessages.petDetail.backToList}
          </Link>
        </Button>
      </section>
    );
  }

  const images = pet.media.filter((item) => item.type === "IMAGE");
  const mainImage = images[0]?.url;
  const fallback = `https://placehold.co/1200x800.png?text=${encodeURIComponent(pet.name)}`;
  const petPath = `${PUBLIC_ROUTES.adoption}/${pet.externalId ?? pet.id}`;
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const petUrl = host ? `${protocol}://${host}${petPath}` : petPath;
  const whatsappUrl = buildPetWhatsappUrl({
    petId: pet.id,
    petName: pet.name,
    petUrl,
  });

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <H1 className="text-3xl">{pet.name}</H1>
        <Muted>
          {formatSpecies(pet.species)} · {formatSize(pet.size)} ·{" "}
          {pet.city ?? "Cidade nao informada"}
        </Muted>
      </div>

      <div className="grid gap-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
          <Image
            src={mainImage ?? fallback}
            alt={pet.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        </div>
        {images.length > 1 ? (
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
            {images.slice(1).map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-md border bg-muted"
              >
                <Image
                  src={item.url}
                  alt={pet.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {pet.vaccinated ? <Badge variant="secondary">Vacinado</Badge> : null}
        {pet.castrated ? <Badge variant="secondary">Castrado</Badge> : null}
      </div>

      <div className="rounded-lg border p-4">
        <Typography
          as="p"
          variant="body"
          className="whitespace-pre-wrap text-sm leading-relaxed"
        >
          {pet.description?.trim() || adoptionMessages.petDetail.noDescription}
        </Typography>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="primary">
          <Link href={whatsappUrl} target="_blank" rel="noreferrer">
            {adoptionMessages.petDetail.whatsappCta}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.adoption}>
            {adoptionMessages.petDetail.backToList}
          </Link>
        </Button>
      </div>
    </section>
  );
}
