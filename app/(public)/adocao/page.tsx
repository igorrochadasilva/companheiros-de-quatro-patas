import type { Metadata } from "next";
import { Suspense } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { AdocaoContent } from "@/features/adoption/components/AdocaoContent";

export const metadata: Metadata = {
  title: "Adoção de animais",
  description:
    "Filtre e encontre o pet ideal para adoção. Veja animais disponíveis por espécie, porte, idade e cidade.",
  alternates: {
    canonical: PUBLIC_ROUTES.adoption,
  },
};

export default function AdocaoPage() {
  return (
    <Suspense fallback={<div className="animate-pulse space-y-4 p-4" />}>
      <AdocaoContent />
    </Suspense>
  );
}
