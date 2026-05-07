import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { featureFlags } from "@/shared/config/feature-flags";

const pageTitle = "Transparencia";
const pageDescription =
  "Acompanhe informacoes institucionais e prestacao de contas.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: PUBLIC_ROUTES.transparency,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.transparency,
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

export default function TransparenciaPage() {
  if (!featureFlags.routes.transparency) {
    notFound();
  }

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Transparencia</h1>
      <p className="text-muted-foreground">
        Informacoes institucionais e prestacao de contas.
      </p>
    </section>
  );
}
