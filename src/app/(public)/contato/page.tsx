import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { ContactContentV2 } from "@/features/contact/components/ContactContentV2";
import { contactMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: contactMessages.metadata.title,
  description: contactMessages.metadata.description,
  alternates: {
    canonical: PUBLIC_ROUTES.contact,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.contact,
    siteName: SEO.siteName,
    title: contactMessages.metadata.title,
    description: contactMessages.metadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: contactMessages.metadata.title,
    description: contactMessages.metadata.description,
  },
};

export default function ContatoPage() {
  if (!featureFlags.routes.contact) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <ContactContentV2 />
    </Suspense>
  );
}
