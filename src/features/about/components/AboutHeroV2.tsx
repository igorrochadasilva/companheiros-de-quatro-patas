"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import type { AboutCmsContent } from "@/types";

export function AboutHeroV2({ cms }: { cms?: AboutCmsContent }) {
  const imageUrl = cms?.heroImageUrl ?? aboutMessages.v2.hero.imageUrl;
  const imageAlt = cms?.heroImageAlt ?? aboutMessages.v2.hero.imageAlt;

  return (
    <section className="mx-auto w-full max-w-[1280px] overflow-x-clip bg-gradient-to-b from-[#f6ece5]/40 to-transparent px-6 pb-12 pt-8 md:bg-none md:px-10 md:pb-16 md:pt-10">
      <nav className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#514535]/70 md:mb-6 md:text-xs md:normal-case md:tracking-normal md:text-[#2f2a26]">
        <span className="text-[#f3af3d]">
          {aboutMessages.v2.breadcrumb.home}
        </span>
        <span className="text-[#837563]">/</span>
        <span className="text-[#2f2a26]">
          {aboutMessages.v2.breadcrumb.current}
        </span>
      </nav>

      <div className="grid items-center gap-8 md:gap-10 md:grid-cols-2">
        <div className="max-w-xl">
          <Typography
            as="h1"
            variant="v2H1"
            className="!text-4xl leading-tight tracking-tight md:!text-[76px] md:leading-[1.05]"
          >
            {aboutMessages.v2.hero.titleStart}{" "}
            <span className="text-[#f3af3d] italic">
              {aboutMessages.v2.hero.titleHighlight}
            </span>
          </Typography>

          <Typography
            as="p"
            variant="v2Body"
            className="mt-4 leading-relaxed !text-[#514535] md:mt-6 md:text-lg"
          >
            {aboutMessages.v2.hero.subtitle}
          </Typography>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-[#f3af3d] px-7 text-white hover:bg-[#e6a63a] sm:w-auto"
            >
              <Link href={PUBLIC_ROUTES.adoption}>
                {aboutMessages.v2.hero.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 w-full rounded-full bg-[#46c2c1] px-7 text-white hover:bg-[#3fb0af] sm:w-auto"
            >
              <Link href={PUBLIC_ROUTES.donate}>
                {aboutMessages.v2.hero.secondaryCta}
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden md:block md:justify-self-end">
          <div className="overflow-hidden rounded-2xl bg-[#f0e6e0] shadow-[0_20px_45px_-18px_rgba(31,27,23,0.35)] lg:rotate-2">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="aspect-[4/3] w-full max-w-[560px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
