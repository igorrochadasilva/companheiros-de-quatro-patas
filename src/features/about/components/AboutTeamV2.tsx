"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";

export function AboutTeamV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <div className="rounded-2xl bg-[#f3af3d] px-6 py-7 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <h2 className="text-5xl font-bold leading-none text-[#2f2a26] [font-family:var(--font-v2-headline)]">
            {aboutMessages.v2.team.title}
          </h2>
          <p className="mt-2 text-sm text-[#2f2a26]/85">
            {aboutMessages.v2.team.subtitle}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {aboutMessages.v2.team.roles.map((role) => (
              <div
                key={role}
                className="rounded-md bg-[#f7c979] px-3 py-2 text-sm font-medium text-[#2f2a26]"
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:mt-0 md:min-w-[220px]">
          <Button
            asChild
            className="h-10 rounded-full bg-black text-white hover:bg-black/90"
          >
            <Link href={PUBLIC_ROUTES.contact}>
              {aboutMessages.v2.team.primaryCta}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-10 rounded-full border-black bg-white text-[#2f2a26] hover:bg-[#fff8f0]"
          >
            <Link href={PUBLIC_ROUTES.contact}>
              {aboutMessages.v2.team.secondaryCta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
