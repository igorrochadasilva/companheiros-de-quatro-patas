import Link from "next/link";
import type { RefObject } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { donateMessages } from "@/messages";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";
import type { TransparencySummary } from "@/types";

import { formatCurrency, formatDate } from "./donatation.utils";

interface DonatationTransparencySectionProps {
  transparencyRef: RefObject<HTMLElement | null>;
  isTransparencyLoading: boolean;
  isTransparencyError: boolean;
  transparencySummary?: TransparencySummary;
}

export function DonatationTransparencySection({
  transparencyRef,
  isTransparencyLoading,
  isTransparencyError,
  transparencySummary,
}: DonatationTransparencySectionProps) {
  return (
    <section
      id="transparencia"
      ref={transparencyRef}
      className="scroll-mt-24 space-y-4"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <H2>{donateMessages.transparency.title}</H2>
          <Muted className="text-base">
            {donateMessages.transparency.subtitle}
          </Muted>
        </div>
        <Button asChild variant="outline">
          <Link href={PUBLIC_ROUTES.transparency}>
            {donateMessages.transparency.cta}
          </Link>
        </Button>
      </div>

      {isTransparencyLoading ? (
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-2 p-5">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-7 w-28 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isTransparencyError || !transparencySummary ? (
        <Alert variant="destructive">
          <AlertTitle>{donateMessages.transparency.errorTitle}</AlertTitle>
          <AlertDescription>
            {donateMessages.transparency.errorDescription}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="grid gap-3 md:grid-cols-3">
            <Card>
              <CardContent className="space-y-2 p-5">
                <Muted>{donateMessages.transparency.raisedLabel}</Muted>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(transparencySummary.totalRaised)}
                </p>
                <Muted>
                  {donateMessages.transparency.monthLabelPrefix}{" "}
                  {transparencySummary.monthLabel}
                </Muted>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-5">
                <Muted>{donateMessages.transparency.spentLabel}</Muted>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(transparencySummary.totalSpent)}
                </p>
                <Muted>{donateMessages.transparency.destinationHint}</Muted>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 p-5">
                <Muted>{donateMessages.transparency.balanceLabel}</Muted>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(transparencySummary.balance)}
                </p>
                <Muted>
                  {donateMessages.transparency.updatedAtPrefix}{" "}
                  {formatDate(transparencySummary.lastUpdatedAt)}
                </Muted>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {donateMessages.transparency.lastExpensesTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {transparencySummary.lastExpenses.slice(0, 3).map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between gap-4 rounded-md border p-3"
                >
                  <div>
                    <p className="font-medium">{expense.label}</p>
                    <Muted>{formatDate(expense.date)}</Muted>
                  </div>
                  <p className="font-semibold text-primary">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </section>
  );
}
