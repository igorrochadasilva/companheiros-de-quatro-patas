"use client";

import Image from "next/image";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useBazaarFeatured } from "@/features/home/hooks/useBazaarFeatured";
import messages from "@/messages/pt-br.json";
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

const bazaarMessages = messages.home.bazaar;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function HomeSectionBazaar() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data, isLoading, isError } = useBazaarFeatured({
    enabled: isVisible,
  });
  const items = data?.items ?? [];

  return (
    <section ref={sectionRef} className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <H2>{bazaarMessages.title}</H2>
          <Muted className="text-base">{bazaarMessages.subtitle}</Muted>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={PUBLIC_ROUTES.bazaar}>{bazaarMessages.cta}</Link>
        </Button>
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
        <Muted className="text-sm">{bazaarMessages.empty}</Muted>
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
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={PUBLIC_ROUTES.bazaar}>{bazaarMessages.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
