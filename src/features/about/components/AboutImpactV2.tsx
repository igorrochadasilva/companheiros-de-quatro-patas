"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import type { Stats } from "@/types";

function formatNumber(value: number | undefined) {
  if (typeof value !== "number") return "--";
  return `${value}`;
}

export function AboutImpactV2({ stats }: { stats: Stats | undefined }) {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-none [font-family:var(--font-v2-headline)]">
            {aboutMessages.v2.impact.title}
          </h2>
          <p className="mt-2 text-sm text-[#514535]">
            {aboutMessages.v2.impact.subtitle}
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="h-10 rounded-full border-[#d5c4af] bg-[#f0e6e0] px-5 text-[#2f2a26]"
        >
          <Link href={PUBLIC_ROUTES.transparency}>
            {aboutMessages.v2.impact.transparencyCta}
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-xl bg-[#eef5f4] p-6">
          <p className="text-xs font-medium uppercase text-[#514535]">
            {aboutMessages.v2.impact.adoptedLabel}
          </p>
          <p className="mt-2 text-5xl font-bold text-[#2f2a26]">
            {formatNumber(stats?.adoptedCount)}
          </p>
          <p className="mt-2 text-xs text-[#46c2c1]">
            {aboutMessages.v2.impact.adoptedHint}
          </p>
        </article>
        <article className="rounded-xl bg-[#eef5f4] p-6">
          <p className="text-xs font-medium uppercase text-[#514535]">
            {aboutMessages.v2.impact.inTreatmentLabel}
          </p>
          <p className="mt-2 text-5xl font-bold text-[#2f2a26]">
            {formatNumber(stats?.inTreatmentCount)}
          </p>
          <p className="mt-2 text-xs text-[#514535]">
            {aboutMessages.v2.impact.inTreatmentHint}
          </p>
        </article>
        <article className="rounded-xl bg-[#eef5f4] p-6">
          <p className="text-xs font-medium uppercase text-[#514535]">
            {aboutMessages.v2.impact.rescuedLabel}
          </p>
          <p className="mt-2 text-5xl font-bold text-[#2f2a26]">
            {formatNumber(stats?.rescuedCount)}
          </p>
          <p className="mt-2 text-xs text-[#f3af3d]">
            {aboutMessages.v2.impact.rescuedHint}
          </p>
        </article>
      </div>
    </section>
  );
}
