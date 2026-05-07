import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { ShelterContent } from "@/features/shelter/components/ShelterContent";
import { shelterMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: shelterMessages.metadata.title,
  description: shelterMessages.metadata.description,
  alternates: {
    canonical: PUBLIC_ROUTES.shelter,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.shelter,
    siteName: SEO.siteName,
    title: shelterMessages.metadata.title,
    description: shelterMessages.metadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: shelterMessages.metadata.title,
    description: shelterMessages.metadata.description,
  },
};

export default function AbrigoPage() {
  if (!featureFlags.routes.shelter) {
    notFound();
  }

  return <ShelterContent />;
}
