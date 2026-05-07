import { PUBLIC_ROUTES, SEO } from "@/constants";
import { CONTACT } from "@/constants/contact";
import type { Pet } from "@/types";

import { getPetCanonicalSlug } from "./pet-slug";

type PetDetailJsonLdInput = {
  name: string;
  description?: string | null;
  species: string;
  gender?: string | null;
  size?: string | null;
  city?: string | null;
  state?: string | null;
  canonicalSlug: string;
  imageUrl?: string;
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.siteName,
    url: SEO.siteUrl,
    email: CONTACT.email,
    sameAs: [CONTACT.instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT.email,
      },
    ],
    areaServed: "BR",
  };
}

export function buildAdoptionItemListJsonLd(input: {
  title: string;
  items: Pet[];
  page: number;
  pageSize: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.title,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: input.items.length,
    itemListElement: input.items.map((pet, index) => {
      const slug = getPetCanonicalSlug(pet);
      const itemUrl = `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}/${slug}`;
      return {
        "@type": "ListItem",
        position: (input.page - 1) * input.pageSize + index + 1,
        url: itemUrl,
        name: pet.name,
      };
    }),
  };
}

export function buildPetCanonicalUrl(slug: string) {
  return `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}/${slug}`;
}

export function buildPetJsonLd(input: PetDetailJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Pet",
    name: input.name,
    description: input.description ?? undefined,
    url: buildPetCanonicalUrl(input.canonicalSlug),
    image: input.imageUrl || undefined,
    animalType: input.species,
    gender: input.gender ?? undefined,
    size: input.size ?? undefined,
    address: input.city
      ? {
          "@type": "PostalAddress",
          addressLocality: input.city,
          addressRegion: input.state ?? undefined,
          addressCountry: "BR",
        }
      : undefined,
  };
}

export function buildPetBreadcrumbJsonLd(input: {
  petName: string;
  canonicalSlug: string;
}) {
  return {
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
        name: input.petName,
        item: buildPetCanonicalUrl(input.canonicalSlug),
      },
    ],
  };
}
