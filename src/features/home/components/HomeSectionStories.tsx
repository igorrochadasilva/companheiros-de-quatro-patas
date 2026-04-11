"use client";

import Image from "next/image";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { useStories } from "@/features/home/hooks/useStories";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";

const STORIES_SECTION_EMPTY =
  "Não há histórias para exibir no momento. Tente novamente mais tarde.";

export function HomeSectionStories() {
  const [sectionRef, isVisible] = useWhenVisible({ rootMargin: "150px" });
  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const { data, isLoading, isError } = useStories({ enabled: isVisible });
  const items = data?.items ?? [];

  const title = cms?.storiesTitle?.trim() ?? "";
  const subtitle = cms?.storiesSubtitle?.trim() ?? "";
  const cta = cms?.storiesCta?.trim() ?? "";
  const ctaHref = cms?.storiesCtaHref || PUBLIC_ROUTES.adoption;

  if (isCmsPending) {
    return (
      <section ref={sectionRef} className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64 rounded" />
            <Skeleton className="h-5 w-full max-w-lg rounded" />
          </div>
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
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
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : isError || items.length === 0 ? (
        <Muted className="text-sm">{STORIES_SECTION_EMPTY}</Muted>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <div className="relative aspect-video w-full bg-muted">
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader className="space-y-1">
                <CardTitle className="text-base">{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Muted className="text-sm">{story.summary}</Muted>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
