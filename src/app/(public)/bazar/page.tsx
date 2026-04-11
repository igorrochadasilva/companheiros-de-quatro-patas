import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BazaarContent } from "@/features/bazaar/components/BazaarContent";
import { bazaarMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: bazaarMessages.metadata.title,
  description: bazaarMessages.metadata.description,
};

export default function BazarPage() {
  if (!featureFlags.routes.bazaar) {
    notFound();
  }

  return <BazaarContent />;
}
