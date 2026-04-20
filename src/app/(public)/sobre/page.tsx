import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { AboutContentV2 } from "@/features/about/components/AboutContentV2";
import { aboutMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: aboutMessages.metadata.title,
  description: aboutMessages.metadata.description,
  alternates: {
    canonical: PUBLIC_ROUTES.about,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.about,
    siteName: SEO.siteName,
    title: aboutMessages.metadata.title,
    description: aboutMessages.metadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: aboutMessages.metadata.title,
    description: aboutMessages.metadata.description,
  },
};

export default function SobrePage() {
  if (!featureFlags.routes.about) {
    notFound();
  }

  return <AboutContentV2 />;
}
