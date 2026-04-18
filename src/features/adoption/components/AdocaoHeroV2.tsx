"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { useAdoptionCmsContent } from "@/features/adoption/hooks/useAdoptionCmsContent";
import { adoptionMessages } from "@/messages";
import { Typography } from "@/shared/ui/typography";

const heroMessages = adoptionMessages.hero;

export function AdocaoHeroV2() {
  const { data: cms } = useAdoptionCmsContent();

  const title = cms?.adoptionTitle?.trim() || heroMessages.title;
  const cmsSubtitle = cms?.adoptionSubtitle?.trim() || "";
  const subtitle =
    cmsSubtitle.length >= 60 ? cmsSubtitle : heroMessages.subtitle;

  return (
    <section className="v2-section v2-section-muted relative overflow-hidden !pb-12 !pt-12 md:!pb-16 md:!pt-16">
      <div className="pointer-events-none absolute right-[-9rem] top-[-9rem] h-80 w-80 rounded-full bg-[var(--v2-primary)]/15 blur-[120px]" />
      <div className="v2-container relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-[var(--v2-on-surface-variant)]">
          <Link
            href={PUBLIC_ROUTES.home}
            className="transition-colors hover:text-[var(--v2-primary)]"
          >
            {heroMessages.breadcrumbHome}
          </Link>
          <span aria-hidden>{">"}</span>
          <span className="text-[var(--v2-primary)]">
            {heroMessages.breadcrumbCurrent}
          </span>
        </nav>

        <Typography
          as="h1"
          variant="v2H1"
          className="text-6xl leading-[1.05] !font-bold md:text-7xl"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          variant="v2Muted"
          className="mt-4 max-w-3xl !text-xl !font-normal leading-relaxed md:!text-xl"
        >
          {subtitle}
        </Typography>
      </div>
    </section>
  );
}
