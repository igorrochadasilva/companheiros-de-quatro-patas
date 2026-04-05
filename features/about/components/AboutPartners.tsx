import Link from "next/link";

import { CONTACT_SUBJECT_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";

export function AboutPartners() {
  return (
    <section id="parceiros" className="scroll-mt-24 space-y-4">
      <H2>{aboutMessages.partners.title}</H2>
      <Muted className="text-base">{aboutMessages.partners.subtitle}</Muted>

      <Card>
        <CardContent className="p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {aboutMessages.partners.items.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button asChild variant="outline">
        <Link href={CONTACT_SUBJECT_ROUTES.partnership}>
          {aboutMessages.partners.cta}
        </Link>
      </Button>
    </section>
  );
}
