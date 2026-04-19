"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";

export function AboutHeroV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] overflow-x-clip px-6 pb-16 pt-8 md:px-10 md:pt-10">
      <nav className="mb-6 flex items-center gap-2 text-xs">
        <span className="text-[#f3af3d]">
          {aboutMessages.v2.breadcrumb.home}
        </span>
        <span className="text-[#837563]">/</span>
        <span className="text-[#2f2a26]">
          {aboutMessages.v2.breadcrumb.current}
        </span>
      </nav>

      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-[76px] [font-family:var(--font-v2-headline)]">
            {aboutMessages.v2.hero.titleStart}{" "}
            <span className="text-[#f3af3d] italic">
              {aboutMessages.v2.hero.titleHighlight}
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#514535]">
            {aboutMessages.v2.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 rounded-full bg-[#f3af3d] px-7 text-white hover:bg-[#e6a63a]"
            >
              <Link href={PUBLIC_ROUTES.adoption}>
                {aboutMessages.v2.hero.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full bg-[#46c2c1] px-7 text-white hover:bg-[#3fb0af]"
            >
              <Link href={PUBLIC_ROUTES.donate}>
                {aboutMessages.v2.hero.secondaryCta}
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:justify-self-end">
          <div className="overflow-hidden rounded-2xl bg-[#f0e6e0] shadow-[0_20px_45px_-18px_rgba(31,27,23,0.35)] lg:rotate-2">
            <img
              src={aboutMessages.v2.hero.imageUrl}
              alt={aboutMessages.v2.hero.imageAlt}
              className="aspect-[4/3] w-full max-w-[560px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
