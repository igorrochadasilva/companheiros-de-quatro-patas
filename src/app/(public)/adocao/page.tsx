import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { AdocaoContentV2 } from "@/features/adoption/components/AdocaoContentV2";
import { featureFlags } from "@/shared/config/feature-flags";

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

export default function AdocaoPage() {
  if (!featureFlags.routes.adoption) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="animate-pulse space-y-4 p-4" />}>
      <AdocaoContentV2 />
    </Suspense>
  );
}
