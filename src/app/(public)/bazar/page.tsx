import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { BazaarContent } from "@/features/bazaar/components/BazaarContent";
import { bazaarMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: bazaarMessages.metadata.title,
  description: bazaarMessages.metadata.description,
  alternates: {
    canonical: PUBLIC_ROUTES.bazaar,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.bazaar,
    siteName: SEO.siteName,
    title: bazaarMessages.metadata.title,
    description: bazaarMessages.metadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: bazaarMessages.metadata.title,
    description: bazaarMessages.metadata.description,
  },
};

export default function BazarPage() {
  if (!featureFlags.routes.bazaar) {
    notFound();
  }

  return <BazaarContent />;
}
