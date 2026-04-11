import {
  HeartPulseIcon,
  HomeIcon,
  LifeBuoyIcon,
  StethoscopeIcon,
  SyringeIcon,
} from "lucide-react";
import Link from "next/link";

import { PUBLIC_ANCHOR_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";

const iconByIndex = [
  LifeBuoyIcon,
  StethoscopeIcon,
  SyringeIcon,
  HomeIcon,
  HeartPulseIcon,
];

export function AboutWhatWeDo() {
  return (
    <section id="como-ajudamos" className="scroll-mt-24 space-y-4">
      <H2>{aboutMessages.howWeHelp.title}</H2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {aboutMessages.howWeHelp.cards.map((card, index) => {
          const Icon = iconByIndex[index] ?? HeartPulseIcon;
          return (
            <Card key={card.title}>
              <CardHeader className="space-y-2">
                <Icon className="size-5 text-primary" />
                <CardTitle className="text-lg">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Muted>{card.description}</Muted>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button asChild variant="outline">
        <Link href={PUBLIC_ANCHOR_ROUTES.adoptionRules}>
          {aboutMessages.howWeHelp.cta}
        </Link>
      </Button>
    </section>
  );
}
