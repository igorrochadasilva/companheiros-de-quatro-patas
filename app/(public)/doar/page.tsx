import type { Metadata } from "next";

import { PUBLIC_ROUTES } from "@/constants";
import { DonatationContent } from "@/features/donatation/components/DonatationContent";

export const metadata: Metadata = {
  title: "Doe e ajude a manter o abrigo",
  description:
    "Doe via PIX, conheça opções de apoio e acompanhe a transparência da ONG para ajudar os animais resgatados.",
  alternates: {
    canonical: PUBLIC_ROUTES.donate,
  },
};

export default function DoarPage() {
  return <DonatationContent />;
}
