"use client";

import { ClipboardListIcon, HandHeartIcon, HouseIcon, SearchCheckIcon } from "lucide-react";

import { homeMessages } from "@/messages";
import { Typography } from "@/shared/ui/typography";

const stepIcons = [
  SearchCheckIcon,
  ClipboardListIcon,
  HandHeartIcon,
  HouseIcon,
] as const;

const stepNumbers = ["01", "02", "03", "04"] as const;

export function HomeSectionHowAdoptionWorksV2() {
  const steps = homeMessages.adoptionHowV2.steps;

  return (
    <section className="v2-section">
      <div className="v2-container">
        <div className="mb-16 text-center">
          <Typography as="h2" variant="v2H2" className="mb-4">
            {homeMessages.adoptionHowV2.title}
          </Typography>
          <Typography as="p" variant="v2Muted">
            {homeMessages.adoptionHowV2.subtitle}
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? SearchCheckIcon;
            const number = stepNumbers[index] ?? `${index + 1}`;

            return (
              <article key={step.title} className="group relative">
                <span className="absolute -left-4 -top-8 text-8xl font-black text-[var(--v2-primary)]/5">
                  {number}
                </span>

                <div className="relative z-10 rounded-2xl bg-[var(--v2-surface-container)] p-8 transition-colors group-hover:bg-[var(--v2-primary-container)]/10">
                  <Icon
                    className="mb-4 size-10 text-[var(--v2-primary)]"
                    aria-hidden
                  />
                  <Typography as="h3" variant="v2Body" className="mb-2 text-xl !font-bold">
                    {step.title}
                  </Typography>
                  <Typography as="p" variant="v2Muted" className="leading-relaxed">
                    {step.description}
                  </Typography>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
