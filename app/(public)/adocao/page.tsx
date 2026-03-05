import type { Metadata } from "next";
import { Suspense } from "react";

import { AdocaoContent } from "@/features/adoption/components/AdocaoContent";

export const metadata: Metadata = {
  title: "Adoção de animais | Companheiros de Quatro Patas",
  description:
    "Filtre e encontre o pet ideal para adoção em Companheiros de Quatro Patas. Veja animais disponíveis, use filtros por espécie, porte, idade e cidade, e comece sua candidatura.",
};

export default function AdocaoPage() {
  return (
    <Suspense fallback={<div className="animate-pulse space-y-4 p-4" />}>
      <AdocaoContent />
    </Suspense>
  );
}
