import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { DonatationContent } from "@/features/donatation/components/DonatationContent";
import { featureFlags } from "@/shared/config/feature-flags";

const pageTitle = "Doe e ajude a manter o abrigo";
const pageDescription =
  "Doe via PIX, conheca opcoes de apoio e acompanhe a transparencia da ONG para ajudar os animais resgatados.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: PUBLIC_ROUTES.donate,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.donate,
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

export default function DoarPage() {
  if (!featureFlags.routes.donate) {
    notFound();
  }

  return <DonatationContent />;
}
