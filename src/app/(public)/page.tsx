import type { Metadata } from "next";

import { PUBLIC_ROUTES } from "@/constants";
import { appMessages } from "@/messages";

import { HomeV2 } from "./home/HomeV2";

export const metadata: Metadata = {
  title: appMessages.name,
  description:
    "Conheça animais para adoção, acompanhe nosso abrigo e apoie a ONG Companheiros de Quatro Patas.",
  alternates: {
    canonical: PUBLIC_ROUTES.home,
  },
};

export default function HomePage() {
  return <HomeV2 />;
}
