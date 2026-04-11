import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { getPublicPetById } from "@/backend/modules/pets/application/get-public-pet-by-id";
import { PUBLIC_ROUTES, SEO } from "@/constants";
import { AdocaoPetDetailContent } from "@/features/adoption/components/AdocaoPetDetailContent";
import { featureFlags } from "@/shared/config/feature-flags";

type AnimalPageProps = {
  params: Promise<{ slug: string }>;
};

const getPetCached = cache(getPublicPetById);

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
      title: "Pet não encontrado",
      description: "Este pet não está disponível para adoção no momento.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const petSlug = pet.externalId ?? pet.id;
  const url = `${PUBLIC_ROUTES.adoption}/${petSlug}`;
  const mainImage =
    pet.media.find((item) => item.type === "IMAGE")?.url ??
    `https://placehold.co/1200x630.png?text=${encodeURIComponent(pet.name)}`;
  const description = [
    `${pet.name} está disponível para adoção responsável.`,
    pet.city ? `Cidade: ${pet.city}.` : null,
    pet.description ? pet.description.slice(0, 120) : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title: `${pet.name} para adoção`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: SEO.siteLocale,
      url,
      title: `${pet.name} para adoção`,
      description,
      images: [
        {
          url: mainImage,
          alt: pet.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pet.name} para adoção`,
      description,
      images: [mainImage],
    },
  };
}

export default async function AnimalPage({ params }: AnimalPageProps) {
  if (!featureFlags.routes.adoption) {
    notFound();
  }

  const { slug } = await params;

  return <AdocaoPetDetailContent slug={slug} />;
}
