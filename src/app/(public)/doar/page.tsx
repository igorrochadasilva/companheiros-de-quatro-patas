import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PUBLIC_ROUTES } from "@/constants";
import { DonatationContent } from "@/features/donatation/components/DonatationContent";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: "Doe e ajude a manter o abrigo",
  description:
    "Doe via PIX, conheça opções de apoio e acompanhe a transparência da ONG para ajudar os animais resgatados.",
  alternates: {
    canonical: PUBLIC_ROUTES.donate,
  },
};

export default function DoarPage() {
  if (!featureFlags.routes.donate) {
    notFound();
  }

  return <DonatationContent />;
}
