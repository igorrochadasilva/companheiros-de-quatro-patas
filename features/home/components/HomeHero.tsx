"use client";

import Image from "next/image";
import Link from "next/link";

import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { useStats } from "@/features/home/hooks/useStats";

import { homeMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H1, Lead } from "@/shared/ui/typography";

const heroStatsLabels = homeMessages.hero.stats;

export function HomeHero() {
  const { data: stats, isLoading, isError } = useStats();
  const { data: homeCmsContent, isPending: isCmsPending } = useHomeCmsContent();

  const heroTitle = homeCmsContent?.title ?? "";
  const heroSubtitle = homeCmsContent?.subtitle ?? "";
  const primaryCtaLabel = homeCmsContent?.primaryCtaLabel ?? "";
  const secondaryCtaLabel = homeCmsContent?.secondaryCtaLabel ?? "";
  const heroImageUrl =
    homeCmsContent?.heroImageUrl ||
    "https://placehold.co/600x500.png?text=Companheiros";
  const heroImageAlt = homeCmsContent?.heroImageAlt || heroTitle || "Hero";

  return (
    <section className="grid gap-8 md:grid-cols-2 md:gap-12 md:items-center">
      <div className="space-y-6">
        {isCmsPending ? (
          <>
            <Skeleton className="h-10 w-full max-w-md rounded" />
            <Skeleton className="h-20 w-full max-w-lg rounded" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-11 w-36 rounded-md" />
              <Skeleton className="h-11 w-40 rounded-md" />
            </div>
          </>
        ) : (
          <>
            <H1>{heroTitle}</H1>
            <Lead>{heroSubtitle}</Lead>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/#animais">{primaryCtaLabel}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/#doar">{secondaryCtaLabel}</Link>
              </Button>
            </div>
          </>
        )}
        <div className="grid grid-cols-3 gap-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="py-4">
                  <CardContent className="flex flex-col items-center gap-1 p-0 px-4 text-center">
                    <Skeleton className="h-8 w-12 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : isError ? (
            <p className="col-span-3 text-sm text-muted-foreground">
              Métricas em breve.
            </p>
          ) : stats ? (
            <>
              <Card className="py-4">
                <CardContent className="flex flex-col items-center gap-0.5 p-0 px-4 text-center">
                  <span className="text-2xl font-bold tabular-nums text-primary">
                    {stats.adoptedCount.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {heroStatsLabels.adopted}
                  </span>
                </CardContent>
              </Card>
              <Card className="py-4">
                <CardContent className="flex flex-col items-center gap-0.5 p-0 px-4 text-center">
                  <span className="text-2xl font-bold tabular-nums text-primary">
                    {stats.inTreatmentCount.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {heroStatsLabels.inTreatment}
                  </span>
                </CardContent>
              </Card>
              <Card className="py-4">
                <CardContent className="flex flex-col items-center gap-0.5 p-0 px-4 text-center">
                  <span className="text-2xl font-bold tabular-nums text-primary">
                    {stats.rescuedCount.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {heroStatsLabels.rescued}
                  </span>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </div>
      <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted/30 md:aspect-square">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
