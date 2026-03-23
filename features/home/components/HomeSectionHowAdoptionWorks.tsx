"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Lead, Muted } from "@/shared/ui/typography";

export function HomeSectionHowAdoptionWorks() {
  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const title = cms?.adoptionHowTitle?.trim() ?? "";
  const subtitle = cms?.adoptionHowSubtitle?.trim() ?? "";
  const cta = cms?.adoptionHowCta?.trim() ?? "";
  const ctaHref = cms?.adoptionHowCtaHref || PUBLIC_ROUTES.adoption;
  const steps = cms?.adoptionHowSteps ?? [];

  if (isCmsPending) {
    return (
      <section className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <Skeleton className="h-9 w-64 rounded" />
          <Skeleton className="h-16 w-full rounded" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-full">
              <CardContent className="flex h-full flex-col gap-2 p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-9 w-48 rounded-md" />
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="max-w-2xl space-y-3">
        {title ? <H2>{title}</H2> : null}
        {subtitle ? (
          <Lead className="text-base text-muted-foreground">{subtitle}</Lead>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step) => (
          <Card key={step.title} className="h-full">
            <CardContent className="flex h-full flex-col gap-2 p-4">
              <p className="text-sm font-semibold text-primary">{step.title}</p>
              <Muted className="text-sm">{step.description}</Muted>
            </CardContent>
          </Card>
        ))}
      </div>

      {cta ? (
        <Button asChild variant="outline" size="sm">
          <Link href={ctaHref}>{cta}</Link>
        </Button>
      ) : null}
    </section>
  );
}
