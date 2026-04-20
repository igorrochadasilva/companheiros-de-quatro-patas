"use client";

import { CircleCheckIcon, HeartIcon, TargetIcon } from "lucide-react";

import { aboutMessages } from "@/messages";

const missionIcons = [HeartIcon, TargetIcon, CircleCheckIcon] as const;

export function AboutMissionV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-10">
      <div className="grid gap-6 md:grid-cols-3">
        {aboutMessages.v2.mission.cards.map((card, index) => {
          const Icon = missionIcons[index] ?? HeartIcon;
          const iconTone =
            index === 0
              ? "bg-[#f3af3d]/15 text-[#f3af3d]"
              : index === 1
                ? "bg-[#46c2c1]/15 text-[#46c2c1]"
                : "bg-[#875300]/15 text-[#875300]";
          return (
            <article
              key={card.title}
              className="rounded-2xl border border-[#d5c4af]/20 bg-[#fff] p-7 shadow-sm md:bg-[#fcf2eb] md:p-8 md:shadow-none"
            >
              <div
                className={`mb-4 flex size-12 items-center justify-center rounded-full ${iconTone}`}
              >
                <Icon className="size-5" />
              </div>
              <h3 className="text-3xl font-bold leading-none md:text-4xl [font-family:var(--font-v2-headline)]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#514535]">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
