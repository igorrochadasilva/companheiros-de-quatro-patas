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
          return (
            <article key={card.title} className="rounded-2xl bg-[#fcf2eb] p-8">
              <Icon className="mb-4 size-6 text-[#f3af3d]" />
              <h3 className="text-4xl font-bold leading-none [font-family:var(--font-v2-headline)]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#514535]">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
