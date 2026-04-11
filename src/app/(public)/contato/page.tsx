import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactContent } from "@/features/contact/components/ContactContent";
import { contactMessages } from "@/messages";

export const metadata: Metadata = {
  title: contactMessages.metadata.title,
  description: contactMessages.metadata.description,
};

export default function ContatoPage() {
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  );
}
