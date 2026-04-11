import type { Metadata } from "next";

import { ShelterContent } from "@/features/shelter/components/ShelterContent";
import { shelterMessages } from "@/messages";

export const metadata: Metadata = {
  title: shelterMessages.metadata.title,
  description: shelterMessages.metadata.description,
};

export default function AbrigoPage() {
  return <ShelterContent />;
}
