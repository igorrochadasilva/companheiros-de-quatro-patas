import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ContactContent } from "@/features/contact/components/ContactContent";
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
      <ContactContent />
    </Suspense>
  );
}
