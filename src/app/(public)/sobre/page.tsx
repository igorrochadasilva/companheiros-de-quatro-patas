import type { Metadata } from "next";

import { AboutContent } from "@/features/about/components/AboutContent";
import { aboutMessages } from "@/messages";

export const metadata: Metadata = {
  title: aboutMessages.metadata.title,
  description: aboutMessages.metadata.description,
};

export default function SobrePage() {
  return <AboutContent />;
}
