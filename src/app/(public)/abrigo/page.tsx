import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShelterContent } from "@/features/shelter/components/ShelterContent";
import { shelterMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: shelterMessages.metadata.title,
  description: shelterMessages.metadata.description,
};

export default function AbrigoPage() {
  if (!featureFlags.routes.shelter) {
    notFound();
  }

  return <ShelterContent />;
}
