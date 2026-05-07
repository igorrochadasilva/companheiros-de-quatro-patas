import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

import { getPublicPetById } from "@/backend/modules/pets/application/get-public-pet-by-id";
import { PUBLIC_ROUTES, SEO } from "@/constants";
import { AdocaoPetDetailContent } from "@/features/adoption/components/AdocaoPetDetailContent";
import { featureFlags } from "@/shared/config/feature-flags";

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

  const petSlug = pet.externalId ?? pet.id;
  const url = `${PUBLIC_ROUTES.adoption}/${petSlug}`;
  const mainImage = toAbsoluteImageUrl(
    pet.media.find((item) => item.type === "IMAGE")?.url ?? "",
  );

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
    const canonicalSlug = pet.externalId ?? pet.id;
    if (slug !== canonicalSlug) {
      redirect(`${PUBLIC_ROUTES.adoption}/${canonicalSlug}`);
    }
  }

  return <AdocaoPetDetailContent slug={slug} />;
}
