"use client";

import Image from "next/image";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useBazaarFeatured } from "@/features/home/hooks/useBazaarFeatured";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";

const BAZAAR_SECTION_EMPTY =
  "Não há produtos em destaque no momento. Tente novamente mais tarde.";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function HomeSectionBazaar() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const { data, isLoading, isError } = useBazaarFeatured({
    enabled: isVisible,
  });
  const items = data?.items ?? [];

  const title = cms?.bazaarTitle?.trim() ?? "";
  const subtitle = cms?.bazaarSubtitle?.trim() ?? "";
  const cta = cms?.bazaarCta?.trim() ?? "";
  const ctaHref = cms?.bazaarCtaHref || PUBLIC_ROUTES.bazaar;

  if (isCmsPending) {
    return (
      <section ref={sectionRef} className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48 rounded" />
            <Skeleton className="h-5 w-full max-w-md rounded" />
          </div>
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardHeader>
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
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : isError || items.length === 0 ? (
        <Muted className="text-sm">{BAZAAR_SECTION_EMPTY}</Muted>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex h-full flex-col overflow-hidden"
            >
              <div className="relative aspect-square w-full bg-muted">
                <Image
                  src={item.imageUrl ?? "/icon.webp"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.name}
                </CardTitle>
                <Muted className="text-xs">{item.category ?? "Bazar"}</Muted>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm font-semibold text-primary">
                  {formatCurrency(item.price)}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                {cta ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href={ctaHref}>{cta}</Link>
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
