import type { Metadata } from "next";

import { BazaarContent } from "@/features/bazaar/components/BazaarContent";
import messages from "@/messages/pt-br.json";

const bazaarMessages = messages.bazaar;

export const metadata: Metadata = {
  title: bazaarMessages.metadata.title,
  description: bazaarMessages.metadata.description,
};

export default function BazarPage() {
  return <BazaarContent />;
}
