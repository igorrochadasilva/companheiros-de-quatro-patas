"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useAdoptionCmsContent } from "@/features/adoption/hooks/useAdoptionCmsContent";
import { adoptionMessages } from "@/messages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { Skeleton } from "@/shared/ui/skeleton";
import { H1, Muted } from "@/shared/ui/typography";

const heroMessages = adoptionMessages.hero;

export function AdocaoHero() {
  const { data: cms, isPending: isCmsPending } = useAdoptionCmsContent();

  const title = cms?.adoptionTitle?.trim() ?? "";
  const subtitle = cms?.adoptionSubtitle?.trim() ?? "";

  return (
    <section className="space-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PUBLIC_ROUTES.home}>
                {heroMessages.breadcrumbHome}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{heroMessages.breadcrumbCurrent}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isCmsPending ? (
        <>
          <Skeleton className="h-9 w-48 max-w-md rounded" />
          <Skeleton className="h-6 w-full max-w-lg rounded" />
        </>
      ) : (
        <>
          <H1>{title || heroMessages.title}</H1>
          <Muted className="text-base">
            {subtitle || heroMessages.subtitle}
          </Muted>
        </>
      )}
    </section>
  );
}
