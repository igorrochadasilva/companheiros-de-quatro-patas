"use client";

import { DownloadIcon } from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useTransparencySummary } from "@/features/home/hooks/useTransparencySummary";
import { homeMessages } from "@/messages";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Typography } from "@/shared/ui/typography";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function HomeSectionTransparencyV2() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data, isLoading, isError } = useTransparencySummary({
    enabled: isVisible,
  });
  const reportDate = data?.lastUpdatedAt
    ? formatDate(data.lastUpdatedAt)
    : formatDate(new Date().toISOString());

  return (
    <section ref={sectionRef} className="v2-section v2-section-container">
      <div className="v2-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Typography as="h2" variant="v2H2" align="center" className="mb-4">
            {homeMessages.transparency.v2.title}
          </Typography>
          <Typography as="p" variant="v2Muted" align="center">
            {homeMessages.transparency.v2.subtitle}
          </Typography>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className={[
                  "h-36 animate-pulse rounded-2xl bg-[var(--v2-surface-container-high)]",
                  skeleton === 3 ? "col-span-2 md:col-span-1" : "",
                ].join(" ")}
              />
            ))}
          </div>
        ) : isError || !data ? (
          <div className="rounded-2xl bg-[var(--v2-surface-container-lowest)] p-6 text-center">
            <Typography as="p" variant="v2Muted">
              Nao foi possivel carregar os dados de transparencia no momento.
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-[var(--v2-surface-container-lowest)] p-6 text-center md:bg-[var(--v2-surface-container-high)]">
              <Typography
                as="p"
                variant="v2Label"
                className="mb-2 text-sm tracking-normal normal-case"
              >
                {homeMessages.transparency.v2.raisedLabel}
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="text-4xl !font-bold text-[var(--v2-secondary)]"
              >
                {formatCurrency(data.totalRaised)}
              </Typography>
            </article>

            <article className="rounded-2xl bg-[var(--v2-surface-container-lowest)] p-6 text-center md:bg-[var(--v2-surface-container-high)]">
              <Typography
                as="p"
                variant="v2Label"
                className="mb-2 text-sm tracking-normal normal-case"
              >
                {homeMessages.transparency.v2.spentLabel}
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="text-4xl !font-bold text-[var(--v2-error)]"
              >
                {formatCurrency(data.totalSpent)}
              </Typography>
            </article>

            <article className="hidden rounded-2xl bg-[var(--v2-primary-container)]/20 p-6 text-center md:block">
              <Typography
                as="p"
                variant="v2Label"
                className="mb-2 text-sm tracking-normal normal-case"
              >
                {homeMessages.transparency.v2.balanceLabel}
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="mb-2 text-4xl !font-bold text-[var(--v2-primary)]"
              >
                {formatCurrency(data.balance)}
              </Typography>
            </article>

            <article className="col-span-2 rounded-2xl bg-[var(--v2-surface-container-lowest)] p-6 md:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <Typography as="p" variant="v2Body" className="!font-bold">
                    {homeMessages.transparency.v2.reportTitle}
                  </Typography>
                  <Typography as="p" variant="v2Muted" className="text-xs">
                    {homeMessages.transparency.v2.updatedPrefix} {reportDate}
                  </Typography>
                </div>
                <Link
                  href={PUBLIC_ROUTES.transparency}
                  className="text-[var(--v2-primary)] transition-opacity hover:opacity-80"
                  aria-label={homeMessages.transparency.v2.reportTitle}
                >
                  <DownloadIcon className="size-5" />
                </Link>
              </div>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
