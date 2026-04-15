"use client";

import { useTransparencySummary } from "@/features/home/hooks/useTransparencySummary";
import { homeMessages } from "@/messages";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Typography } from "@/shared/ui/typography";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function HomeSectionTransparencyV2() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data, isLoading, isError } = useTransparencySummary({
    enabled: isVisible,
  });

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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="h-36 animate-pulse rounded-2xl bg-[var(--v2-surface-container-high)]"
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-[var(--v2-surface-container-high)] p-6 text-center">
              <Typography
                as="p"
                variant="v2Label"
                className="mb-2 text-[10px]"
              >
                {homeMessages.transparency.v2.raisedLabel}
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="text-3xl !font-bold text-[var(--v2-secondary)] md:text-4xl"
              >
                {formatCurrency(data.totalRaised)}
              </Typography>
            </article>

            <article className="rounded-2xl bg-[var(--v2-surface-container-high)] p-6 text-center">
              <Typography
                as="p"
                variant="v2Label"
                className="mb-2 text-[10px]"
              >
                {homeMessages.transparency.v2.spentLabel}
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="text-3xl !font-bold text-[var(--v2-error)] md:text-4xl"
              >
                {formatCurrency(data.totalSpent)}
              </Typography>
            </article>

            <article className="rounded-2xl bg-[var(--v2-primary-container)]/20 p-6 text-center">
              <Typography
                as="p"
                variant="v2Label"
                className="mb-2 text-[10px]"
              >
                {homeMessages.transparency.v2.balanceLabel}
              </Typography>
              <Typography
                as="p"
                variant="v2Body"
                className="text-3xl !font-bold text-[var(--v2-primary)] md:text-4xl"
              >
                {formatCurrency(data.balance)}
              </Typography>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
