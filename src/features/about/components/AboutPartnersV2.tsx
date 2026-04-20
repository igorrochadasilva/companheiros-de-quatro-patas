"use client";

import { HeartIcon, HomeIcon, StethoscopeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

const partnerIcons = [StethoscopeIcon, HeartIcon, UsersIcon, HomeIcon] as const;

export function AboutPartnersV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <Typography
        as="h2"
        variant="v2H2"
        align="center"
        className="!text-[2rem] leading-none md:!text-5xl"
      >
        {aboutMessages.v2.partners.title}
      </Typography>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutMessages.v2.partners.items.map((item, index) => {
          const Icon = partnerIcons[index] ?? UsersIcon;
          return (
            <article
              key={item}
              className="rounded-xl bg-[#dff1f0] p-5 text-center md:p-6"
            >
              <Icon className="mx-auto size-6 text-[#46c2c1]" />
              <Typography
                as="p"
                variant="v2Muted"
                className="mt-3 !text-xs !font-medium !text-[#2f2a26] md:mt-4 md:!text-sm"
              >
                {item}
              </Typography>
            </article>
          );
        })}
      </div>
      <div className="mt-7 text-center">
        <Button
          asChild
          className="h-11 rounded-full bg-[#46c2c1] px-8 text-white hover:bg-[#39adac]"
        >
          <Link href={PUBLIC_ROUTES.contact}>
            {aboutMessages.v2.partners.cta}
          </Link>
        </Button>
      </div>
    </section>
  );
}
