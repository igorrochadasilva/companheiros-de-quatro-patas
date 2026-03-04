"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { useTransparencySummary } from "@/shared/hooks/useTransparencySummary";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";

const transparencyMessages = messages.home.transparency;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function HomeSectionTransparency() {
  const { data, isLoading, isError } = useTransparencySummary();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <H2>{transparencyMessages.title}</H2>
          <Muted className="text-base">{transparencyMessages.subtitle}</Muted>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={PUBLIC_ROUTES.transparency}>
            {transparencyMessages.cta}
          </Link>
        </Button>
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
        <Muted className="text-sm">{transparencyMessages.empty}</Muted>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {transparencyMessages.cards.raisedTitlePrefix} {data.monthLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.totalRaised)}
              </p>
              <Muted className="text-xs">
                {transparencyMessages.cards.raisedDescription}
              </Muted>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {transparencyMessages.cards.spentTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.totalSpent)}
              </p>
              <Muted className="text-xs">
                {transparencyMessages.cards.spentDescription}
              </Muted>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {transparencyMessages.cards.balanceTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.balance)}
              </p>
              <Muted className="text-xs">
                {transparencyMessages.cards.updatedAtPrefix}{" "}
                {new Date(data.lastUpdatedAt).toLocaleDateString("pt-BR")}.
              </Muted>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
