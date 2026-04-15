'use client'

import { ClipboardListIcon, HandHeartIcon, HouseIcon, SearchCheckIcon } from 'lucide-react'

import { homeMessages } from '@/messages'
import { Typography } from '@/shared/ui/typography'

const stepIcons = [SearchCheckIcon, ClipboardListIcon, HandHeartIcon, HouseIcon] as const

const stepNumbers = ['01', '02', '03', '04'] as const

export function HomeSectionHowAdoptionWorksV2() {
  const steps = homeMessages.adoptionHowV2.steps

  return (
    <section className="v2-section">
      <div className="v2-container">
        <div className="mb-16 text-center">
          <Typography as="h2" variant="v2H2" className="mb-4">
            {homeMessages.adoptionHowV2.title}
          </Typography>
          <Typography as="p" variant="v2Muted" className="mx-auto max-w-xl text-sm">
            {homeMessages.adoptionHowV2.subtitle}
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? SearchCheckIcon
            const number = stepNumbers[index] ?? `${index + 1}`

            return (
              <article
                key={step.title}
                className="relative flex h-full items-start gap-5 rounded-2xl bg-[var(--v2-surface-container)] p-6 md:flex-col md:gap-4 md:p-8"
              >
                <span className="pointer-events-none absolute right-6 top-4 text-5xl font-black text-[var(--v2-primary)]/10 md:-right-4 md:-top-4 md:text-8xl md:text-[var(--v2-primary)]/5">
                  {number}
                </span>

                <Icon
                  className="relative z-10 mt-0.5 size-7 shrink-0 text-[var(--v2-primary)] md:size-10"
                  aria-hidden
                />

                <div className="relative z-10 pr-8 md:pr-0">
                  <Typography as="h3" variant="v2Body" className="mb-1 text-lg !font-bold md:mb-2 md:text-xl">
                    {step.title}
                  </Typography>
                  <Typography as="p" variant="v2Muted" className="text-sm leading-relaxed">
                    {step.description}
                  </Typography>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
