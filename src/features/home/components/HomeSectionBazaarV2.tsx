"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useBazaarFeatured } from "@/features/home/hooks/useBazaarFeatured";
import { homeMessages } from "@/messages";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function HomeSectionBazaarV2() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data, isLoading, isError } = useBazaarFeatured({ enabled: isVisible });
  const items = data?.items ?? [];

  return (
    <section ref={sectionRef} className="v2-section v2-section-muted">
      <div className="v2-container">
        <div className="hidden md:block">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <Typography as="h2" variant="v2H2" className="mb-4">
                {homeMessages.bazaar.v2.title}
              </Typography>
              <Typography as="p" variant="v2Muted">
                {homeMessages.bazaar.v2.subtitle}
              </Typography>
            </div>
            <Link
              href={PUBLIC_ROUTES.bazaar}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--v2-primary)] transition-all hover:gap-3"
            >
              {homeMessages.bazaar.v2.viewAll}
              <ArrowRightIcon className="size-4" aria-hidden />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-80 animate-pulse rounded-xl bg-[var(--v2-surface)]"
                />
              ))}
            </div>
          ) : isError || items.length === 0 ? (
            <div className="rounded-2xl bg-[var(--v2-surface)] p-6">
              <Typography as="p" variant="v2Muted">
                {homeMessages.bazaar.v2.empty}
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.slice(0, 4).map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl bg-[var(--v2-surface)] shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.imageUrl ?? "/icon.webp"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <Typography as="h3" variant="v2Body" className="mb-1 !font-bold">
                      {item.name}
                    </Typography>
                    <Typography
                      as="p"
                      variant="v2Body"
                      className="font-bold text-[var(--v2-primary)]"
                    >
                      {formatCurrency(item.price)}
                    </Typography>
                    <Button
                      asChild
                      className="mt-4 h-9 w-full rounded-full bg-[var(--v2-secondary-container)] text-sm font-bold text-[var(--v2-on-secondary-container)] transition-colors hover:opacity-90"
                    >
                      <Link href={PUBLIC_ROUTES.bazaar}>
                        {homeMessages.bazaar.v2.buy}
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <div className="text-center">
            <Typography as="h2" variant="v2H2" className="mb-3 text-3xl">
              {homeMessages.bazaar.v2.title}
            </Typography>
            <Typography as="p" variant="v2Muted" className="mb-8 text-sm">
              {homeMessages.bazaar.v2.subtitle}
            </Typography>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((skeleton) => (
                  <div
                    key={skeleton}
                    className="aspect-square animate-pulse rounded-xl bg-[var(--v2-surface-container-high)]"
                  />
                ))}
              </div>
            ) : isError || items.length === 0 ? (
              <Typography as="p" variant="v2Muted">
                {homeMessages.bazaar.v2.empty}
              </Typography>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {items.slice(0, 2).map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-xl bg-[var(--v2-surface-container-lowest)] shadow-sm"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.imageUrl ?? "/icon.webp"}
                        alt={item.name}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 text-left">
                      <Typography as="p" variant="v2Body" className="mb-1 truncate text-xs !font-bold">
                        {item.name}
                      </Typography>
                      <Typography
                        as="p"
                        variant="v2Body"
                        className="text-sm !font-bold text-[var(--v2-primary)]"
                      >
                        {formatCurrency(item.price)}
                      </Typography>
                      <Button
                        asChild
                        className="mt-3 h-8 w-full rounded-full bg-[var(--v2-secondary)]/10 text-[10px] font-bold text-[var(--v2-secondary)] hover:bg-[var(--v2-secondary)]/20"
                      >
                        <Link href={PUBLIC_ROUTES.bazaar}>
                          {homeMessages.bazaar.v2.buy}
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <Button
              asChild
              variant="outline"
              className="mt-8 h-12 w-full rounded-full border-2 border-[var(--v2-primary)] bg-transparent px-8 text-sm font-bold text-[var(--v2-primary)] hover:bg-[var(--v2-primary)]/5 hover:text-[var(--v2-primary)]"
            >
              <Link href={PUBLIC_ROUTES.bazaar}>
                {homeMessages.bazaar.v2.viewAll}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
