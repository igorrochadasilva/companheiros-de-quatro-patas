"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

export function AboutTeamV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <div className="rounded-2xl bg-[#f3af3d] px-5 py-7 md:px-6 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <Typography
            as="h2"
            variant="v2H2"
            className="!text-[2rem] leading-none !text-[#2f2a26] md:!text-5xl"
          >
            {aboutMessages.v2.team.title}
          </Typography>
          <Typography
            as="p"
            variant="v2Muted"
            className="mt-2 !text-xs !text-[#2f2a26]/85 md:!text-sm"
          >
            {aboutMessages.v2.team.subtitle}
          </Typography>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {aboutMessages.v2.team.roles.map((role) => (
              <div
                key={role}
                className="rounded-md bg-[#f7c979] px-3 py-2 text-xs font-medium text-[#2f2a26] md:text-sm"
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:mt-0 md:min-w-[220px]">
          <Button
            asChild
            className="h-11 rounded-full bg-black text-white hover:bg-black/90"
          >
            <Link href={PUBLIC_ROUTES.contact}>
              {aboutMessages.v2.team.primaryCta}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-black bg-white text-[#2f2a26] hover:bg-[#fff8f0]"
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
