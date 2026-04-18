import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { AdocaoContentV2 } from "@/features/adoption/components/AdocaoContentV2";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: "Adoção de animais",
  description:
    "Filtre e encontre o pet ideal para adoção. Veja animais disponíveis por espécie, porte, idade e cidade.",
  alternates: {
    canonical: PUBLIC_ROUTES.adoption,
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
