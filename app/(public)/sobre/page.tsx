import type { Metadata } from "next";

import { AboutContent } from "@/features/about/components/AboutContent";
import messages from "@/messages/pt-br.json";

const aboutMessages = messages.about;

export const metadata: Metadata = {
  title: aboutMessages.metadata.title,
  description: aboutMessages.metadata.description,
};

export default function SobrePage() {
  return <AboutContent />;
}
