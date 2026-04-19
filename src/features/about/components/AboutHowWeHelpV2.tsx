"use client";

import {
  ArrowRightIcon,
  HeartIcon,
  HomeIcon,
  ScissorsIcon,
  StethoscopeIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { aboutMessages } from "@/messages";
import { Button } from "@/shared/ui/button";

const helpIcons = [
  HeartIcon,
  StethoscopeIcon,
  ScissorsIcon,
  HomeIcon,
  UsersIcon,
] as const;

export function AboutHowWeHelpV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <div className="rounded-2xl bg-[#f6ece5] px-5 py-9 md:px-10">
        <div className="text-center">
          <h2 className="text-5xl font-bold leading-none [font-family:var(--font-v2-headline)]">
            {aboutMessages.v2.howWeHelp.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#514535]">
            {aboutMessages.v2.howWeHelp.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {aboutMessages.v2.howWeHelp.cards.map((card, index) => {
            const Icon = helpIcons[index] ?? HeartIcon;
            const iconClass =
              index % 2 === 0
                ? "bg-[#f3af3d]/20 text-[#875300]"
                : "bg-[#46c2c1]/20 text-[#007070]";

            return (
              <article
                key={card.title}
                className="rounded-xl bg-white p-4 text-center"
              >
                <div
                  className={`mx-auto mb-3 flex size-10 items-center justify-center rounded-full ${iconClass}`}
                >
                  <Icon className="size-4" />
                </div>
                <h3 className="text-sm font-bold">{card.title}</h3>
                <p className="mt-1 text-xs text-[#514535]">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            asChild
            className="text-[#46c2c1] hover:text-[#39adac]"
          >
            <Link href={PUBLIC_ROUTES.adoption}>
              {aboutMessages.v2.howWeHelp.cta}
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
