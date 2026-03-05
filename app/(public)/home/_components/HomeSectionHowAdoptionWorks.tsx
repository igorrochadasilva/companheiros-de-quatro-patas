"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { H2, Lead, Muted } from "@/shared/ui/typography";

const sectionMessages = messages.home.adoptionHow;

export function HomeSectionHowAdoptionWorks() {
  return (
    <section className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <H2>{sectionMessages.title}</H2>
        <Lead className="text-base text-muted-foreground">
          {sectionMessages.subtitle}
        </Lead>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {sectionMessages.steps.map((step) => (
          <Card key={step.title} className="h-full">
            <CardContent className="flex h-full flex-col gap-2 p-4">
              <p className="text-sm font-semibold text-primary">{step.title}</p>
              <Muted className="text-sm">{step.description}</Muted>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button asChild variant="outline" size="sm">
        <Link href={PUBLIC_ROUTES.adoption}>{sectionMessages.cta}</Link>
      </Button>
    </section>
  );
}
