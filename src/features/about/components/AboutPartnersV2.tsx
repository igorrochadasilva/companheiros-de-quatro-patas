"use client";

import { HeartIcon, HomeIcon, StethoscopeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";

const partnerIcons = [StethoscopeIcon, HeartIcon, UsersIcon, HomeIcon] as const;

export function AboutPartnersV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <h2 className="text-center text-5xl font-bold leading-none [font-family:var(--font-v2-headline)]">
        {aboutMessages.v2.partners.title}
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aboutMessages.v2.partners.items.map((item, index) => {
          const Icon = partnerIcons[index] ?? UsersIcon;
          return (
            <article
              key={item}
              className="rounded-xl bg-[#dff1f0] p-6 text-center"
            >
              <Icon className="mx-auto size-6 text-[#46c2c1]" />
              <p className="mt-4 text-sm font-medium text-[#2f2a26]">{item}</p>
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
