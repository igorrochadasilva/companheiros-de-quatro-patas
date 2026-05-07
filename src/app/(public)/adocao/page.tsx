import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { listPets } from "@/backend/modules/pets/application/list-pets";
import { PUBLIC_ROUTES, SEO } from "@/constants";
import { AdocaoContentV2 } from "@/features/adoption/components/AdocaoContentV2";
import { featureFlags } from "@/shared/config/feature-flags";
import { getPetCanonicalSlug } from "@/shared/lib";
import { parseAdoptionSearchParamsRecord } from "@/shared/lib/search-params";
import { JsonLdScript } from "@/shared/ui/json-ld-script";

const pageTitle = "Adoção de animais";
const pageDescription =
  "Filtre e encontre o pet ideal para adoção. Veja animais disponíveis por espécie, porte, idade e cidade.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: PUBLIC_ROUTES.adoption,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.adoption,
    siteName: SEO.siteName,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

type AdocaoPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdocaoPage({ searchParams }: AdocaoPageProps) {
  if (!featureFlags.routes.adoption) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const initialSearchState =
    parseAdoptionSearchParamsRecord(resolvedSearchParams);
  const initialData = await listPets({
    ...initialSearchState.filters,
    page: initialSearchState.page,
    sort: initialSearchState.sort,
  });
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageTitle,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: initialData.items.length,
    itemListElement: initialData.items.map((pet, index) => {
      const slug = getPetCanonicalSlug(pet);
      const itemUrl = `${SEO.siteUrl}${PUBLIC_ROUTES.adoption}/${slug}`;
      return {
        "@type": "ListItem",
        position: (initialData.page - 1) * 12 + index + 1,
        url: itemUrl,
        name: pet.name,
      };
    }),
  };

  return (
    <>
      <JsonLdScript data={itemListJsonLd} />
      <Suspense fallback={<div className="animate-pulse space-y-4 p-4" />}>
        <AdocaoContentV2
          initialSearchState={initialSearchState}
          initialData={initialData}
        />
      </Suspense>
    </>
  );
}
