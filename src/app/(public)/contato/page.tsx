import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContactContentV2 } from "@/features/contact/components/ContactContentV2";
import { contactMessages } from "@/messages";
import { featureFlags } from "@/shared/config/feature-flags";

export const metadata: Metadata = {
  title: contactMessages.metadata.title,
  description: contactMessages.metadata.description,
};

export default function ContatoPage() {
  if (!featureFlags.routes.contact) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <ContactContentV2 />
    </Suspense>
  );
}
