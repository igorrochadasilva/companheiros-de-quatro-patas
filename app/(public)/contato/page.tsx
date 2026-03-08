import type { Metadata } from "next";

import { ContactContent } from "@/features/contact/components/ContactContent";
import messages from "@/messages/pt-br.json";

const contactMessages = messages.contact;

export const metadata: Metadata = {
  title: contactMessages.metadata.title,
  description: contactMessages.metadata.description,
};

export default function ContatoPage() {
  return <ContactContent />;
}
