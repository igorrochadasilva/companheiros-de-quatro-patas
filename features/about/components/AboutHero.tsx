import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { H1, Lead, Muted } from "@/shared/ui/typography";

const aboutMessages = messages.about;

export function AboutHero() {
  return (
    <section className="space-y-4">
      <H1>{aboutMessages.hero.title}</H1>
      <Lead>{aboutMessages.hero.subtitle}</Lead>
      <Muted>
        {aboutMessages.hero.regionLabel}: {aboutMessages.hero.regionValue}
      </Muted>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={PUBLIC_ROUTES.adoption}>
            {aboutMessages.hero.primaryCta}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.donate}>
            {aboutMessages.hero.secondaryCta}
          </Link>
        </Button>
      </div>
    </section>
  );
}
