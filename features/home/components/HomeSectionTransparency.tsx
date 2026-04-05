"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { useTransparencySummary } from "@/features/home/hooks/useTransparencySummary";

import { homeMessages } from "@/messages";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";

const transparencyCardMessages = homeMessages.transparency.cards;

const TRANSPARENCY_LOAD_ERROR =
  "Não foi possível carregar os dados de transparência no momento.";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function HomeSectionTransparency() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const { data, isLoading, isError } = useTransparencySummary({
    enabled: isVisible,
  });

  const title = cms?.transparencyTitle?.trim() ?? "";
  const subtitle = cms?.transparencySubtitle?.trim() ?? "";
  const cta = cms?.transparencyCta?.trim() ?? "";
  const ctaHref = cms?.transparencyCtaHref || PUBLIC_ROUTES.transparency;

  if (isCmsPending) {
    return (
      <section ref={sectionRef} className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48 rounded" />
            <Skeleton className="h-5 w-full max-w-md rounded" />
          </div>
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          {title ? <H2>{title}</H2> : null}
          {subtitle ? <Muted className="text-base">{subtitle}</Muted> : null}
        </div>
        {cta ? (
          <Button asChild variant="outline" size="sm">
            <Link href={ctaHref}>{cta}</Link>
          </Button>
        ) : null}
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError || !data ? (
        <Muted className="text-sm">{TRANSPARENCY_LOAD_ERROR}</Muted>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {transparencyCardMessages.raisedTitlePrefix} {data.monthLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.totalRaised)}
              </p>
              <Muted className="text-xs">
                {transparencyCardMessages.raisedDescription}
              </Muted>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {transparencyCardMessages.spentTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.totalSpent)}
              </p>
              <Muted className="text-xs">
                {transparencyCardMessages.spentDescription}
              </Muted>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {transparencyCardMessages.balanceTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.balance)}
              </p>
              <Muted className="text-xs">
                {transparencyCardMessages.updatedAtPrefix}{" "}
                {new Date(data.lastUpdatedAt).toLocaleDateString("pt-BR")}.
              </Muted>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
