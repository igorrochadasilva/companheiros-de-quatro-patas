import { StoreIcon } from "lucide-react";

import { bazaarMessages } from "@/messages";
import { H1, Lead } from "@/shared/ui/typography";

export function BazaarHero() {
  return (
    <section className="space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
        <StoreIcon className="size-3.5" />
        {bazaarMessages.hero.badge}
      </div>
      <H1>{bazaarMessages.hero.title}</H1>
      <Lead>{bazaarMessages.hero.subtitle}</Lead>
    </section>
  );
}
