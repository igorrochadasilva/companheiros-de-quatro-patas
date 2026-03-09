import type { Metadata } from "next";

import { ShelterContent } from "@/features/shelter/components/ShelterContent";
import messages from "@/messages/pt-br.json";

const shelterMessages = messages.shelter;

export const metadata: Metadata = {
  title: shelterMessages.metadata.title,
  description: shelterMessages.metadata.description,
};

export default function AbrigoPage() {
  return <ShelterContent />;
}
