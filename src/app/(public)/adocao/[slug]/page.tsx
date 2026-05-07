import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { getPublicPetById } from "@/backend/modules/pets/application/get-public-pet-by-id";
import { PUBLIC_ROUTES, SEO } from "@/constants";
import { AdocaoPetDetailContent } from "@/features/adoption/components/AdocaoPetDetailContent";
import { featureFlags } from "@/shared/config/feature-flags";
import { JsonLdScript } from "@/shared/ui/json-ld-script";

type AnimalPageProps = {
  params: Promise<{ slug: string }>;
};

const getPetCached = cache(getPublicPetById);

function toAbsoluteImageUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;

  return new URL(url, SEO.siteUrl).toString();
}

function getPetCanonicalSlug(
  pet: NonNullable<Awaited<ReturnType<typeof getPublicPetById>>>,
) {
  return pet.externalId ?? pet.id;
}

function getPetCanonicalUrl(
  pet: NonNullable<Awaited<ReturnType<typeof getPublicPetById>>>,
) {
  return `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}/${getPetCanonicalSlug(pet)}`;
}

function getMainPetImageUrl(
  pet: NonNullable<Awaited<ReturnType<typeof getPublicPetById>>>,
) {
  return toAbsoluteImageUrl(
    pet.media.find((item) => item.type === "IMAGE")?.url ?? "",
  );
}

export async function generateMetadata({
  params,
}: AnimalPageProps): Promise<Metadata> {
  if (!featureFlags.routes.adoption) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { slug } = await params;
  const pet = await getPetCached(slug);

  if (!pet) {
    return {
      title: "Pet n�o encontrado",
      description: "Este pet n�o est� dispon�vel para ado��o no momento.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const petSlug = getPetCanonicalSlug(pet);
  const url = `${PUBLIC_ROUTES.adoption}/${petSlug}`;
  const mainImage = getMainPetImageUrl(pet);

  const description = [
    `${pet.name} est� dispon�vel para ado��o respons�vel.`,
    pet.city ? `Cidade: ${pet.city}.` : null,
    pet.description ? pet.description.slice(0, 120) : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title: `${pet.name} para ado��o`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: SEO.siteLocale,
      url,
      title: `${pet.name} para ado��o`,
      description,
      ...(mainImage
        ? {
            images: [
              {
                url: mainImage,
                alt: pet.name,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${pet.name} para ado��o`,
      description,
      ...(mainImage ? { images: [mainImage] } : {}),
    },
  };
}

export default async function AnimalPage({ params }: AnimalPageProps) {
  if (!featureFlags.routes.adoption) {
    notFound();
  }

  const { slug } = await params;
  const pet = await getPetCached(slug);

  if (pet) {
    const canonicalSlug = getPetCanonicalSlug(pet);
    if (slug !== canonicalSlug) {
      redirect(`${PUBLIC_ROUTES.adoption}/${canonicalSlug}`);
    }

    const petUrl = getPetCanonicalUrl(pet);
    const mainImage = getMainPetImageUrl(pet);
    const petJsonLd = {
      "@context": "https://schema.org",
      "@type": "Pet",
      name: pet.name,
      description: pet.description ?? undefined,
      url: petUrl,
      image: mainImage || undefined,
      animalType: pet.species,
      gender: pet.gender ?? undefined,
      size: pet.size ?? undefined,
      address: pet.city
        ? {
            "@type": "PostalAddress",
            addressLocality: pet.city,
            addressRegion: pet.state ?? undefined,
            addressCountry: "BR",
          }
        : undefined,
    };
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SEO.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Adocao",
          item: `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: pet.name,
          item: petUrl,
        },
      ],
    };

    return (
      <>
        <JsonLdScript data={petJsonLd} />
        <JsonLdScript data={breadcrumbJsonLd} />
        <AdocaoPetDetailContent slug={slug} />
      </>
    );
  }

  return <AdocaoPetDetailContent slug={slug} />;
}
