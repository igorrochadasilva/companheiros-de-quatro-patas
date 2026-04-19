import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutContentV2 } from "@/features/about/components/AboutContentV2";
import { aboutMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: aboutMessages.metadata.title,
  description: aboutMessages.metadata.description,
};

export default function SobrePage() {
  if (!featureFlags.routes.about) {
    notFound();
  }

  return <AboutContentV2 />;
}
