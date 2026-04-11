import type { Metadata } from "next";

import { BazaarContent } from "@/features/bazaar/components/BazaarContent";
import { bazaarMessages } from "@/messages";

export const metadata: Metadata = {
  title: bazaarMessages.metadata.title,
  description: bazaarMessages.metadata.description,
};

export default function BazarPage() {
  return <BazaarContent />;
}
