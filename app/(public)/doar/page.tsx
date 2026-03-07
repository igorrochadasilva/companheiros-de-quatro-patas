import type { Metadata } from "next";

import { DoarContent } from "./DoarContent";

export const metadata: Metadata = {
  title: "Doe e ajude a manter o abrigo | Companheiros de Quatro Patas",
  description:
    "Doe via PIX, conheça opções de apoio mensal, doação de itens e acompanhe nossa transparência para ajudar os animais resgatados.",
};

export default function DoarPage() {
  return <DoarContent />;
}
