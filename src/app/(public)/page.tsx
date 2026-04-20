import type { Metadata } from "next";

import { PUBLIC_ROUTES, SEO } from "@/constants";
import { appMessages } from "@/messages";

import { HomeV2 } from "./home/HomeV2";

const pageDescription =
  "Conheça animais para adoção, acompanhe nosso abrigo e apoie a ONG Companheiros de Quatro Patas.";

export const metadata: Metadata = {
  title: appMessages.name,
  description: pageDescription,
  alternates: {
    canonical: PUBLIC_ROUTES.home,
  },
  openGraph: {
    type: "website",
    locale: SEO.siteLocale,
    url: PUBLIC_ROUTES.home,
    siteName: SEO.siteName,
    title: appMessages.name,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: appMessages.name,
    description: pageDescription,
  },
};

export default function HomePage() {
  return <HomeV2 />;
}
