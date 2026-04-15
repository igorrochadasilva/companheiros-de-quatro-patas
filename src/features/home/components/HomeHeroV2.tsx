'use client'

import { HeartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_ROUTES } from '@/constants'
import { useHomeCmsContent } from '@/features/home/hooks/useHomeCmsContent'
import { useStats } from '@/features/home/hooks/useStats'
import { homeMessages } from '@/messages'
import { featureFlags } from '@/shared/config/feature-flags'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

export function HomeHeroV2() {
  const { data: stats, isLoading, isError } = useStats()
  const { data: homeCmsContent } = useHomeCmsContent()

  const heroImageUrl = homeCmsContent?.heroImageUrl || 'https://placehold.co/900x1200.png?text=Companheiros'
  const heroImageAlt = homeCmsContent?.heroImageAlt || `${homeMessages.hero.titleTop} ${homeMessages.hero.titleAccent}`

  const primaryCtaHref = featureFlags.home.pets
    ? '/#animais'
    : featureFlags.routes.adoption
      ? PUBLIC_ROUTES.adoption
      : null

  const secondaryCtaHref = featureFlags.home.donationPix
    ? '/#doar'
    : featureFlags.routes.donate
      ? PUBLIC_ROUTES.donate
      : null

  const adoptedValue = isLoading || isError || !stats ? '-' : stats.adoptedCount.toLocaleString('pt-BR')
  const inTreatmentValue = isLoading || isError || !stats ? '-' : stats.inTreatmentCount.toLocaleString('pt-BR')
  const rescuedValue = isLoading || isError || !stats ? '-' : stats.rescuedCount.toLocaleString('pt-BR')

  return (
    <section className="v2-section relative overflow-hidden !pt-12 md:!pt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--v2-primary-container)]/20 to-transparent" />

      <div className="v2-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left">
          <Typography
            as="span"
            variant="v2Muted"
            className="mb-6 inline-block rounded-full bg-[var(--v2-secondary)]/20 px-4 py-1.5 !text-xs !font-bold uppercase tracking-[0.08em] text-[var(--v2-secondary)]"
          >
            {homeMessages.hero.tag}
          </Typography>

          <Typography
            as="h1"
            variant="v2H1"
            className="mx-auto mb-8 max-w-[12ch] text-center text-4xl leading-tight md:mx-0 md:max-w-none md:text-left md:text-7xl"
          >
            {homeMessages.hero.titleTop}
            <br />
            <span className="text-[var(--v2-primary)] italic">{homeMessages.hero.titleAccent}</span>
          </Typography>

          <div className="mb-10 flex w-fit flex-wrap justify-center gap-12 text-center md:w-auto md:justify-start md:text-left">
            <div className="text-center md:text-left">
              <Typography
                as="p"
                variant="v2Body"
                className="text-2xl sm:text-center !font-bold text-[var(--v2-secondary)] md:text-3xl"
              >
                {adoptedValue}
              </Typography>
              <Typography as="p" variant="v2Muted" className="text-xs  md:text-sm">
                {homeMessages.hero.stats.adopted}
              </Typography>
            </div>
            <div className="text-center md:text-left">
              <Typography
                as="p"
                variant="v2Body"
                className="text-2xl text-center !font-bold text-[var(--v2-primary)] md:text-3xl"
              >
                {inTreatmentValue}
              </Typography>
              <Typography as="p" variant="v2Muted" className="text-xs md:text-sm">
                {homeMessages.hero.stats.inTreatment}
              </Typography>
            </div>
            <div className="text-center md:text-left">
              <Typography
                as="p"
                variant="v2Body"
                className="text-2xl text-center !font-bold text-[var(--v2-secondary)] md:text-3xl"
              >
                {rescuedValue}
              </Typography>
              <Typography as="p" variant="v2Muted" className="text-xs md:text-sm">
                {homeMessages.hero.stats.rescued}
              </Typography>
            </div>
          </div>

          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row md:mx-0 md:max-w-none">
            {primaryCtaHref ? (
              <Button
                asChild
                size="lg"
                className="v2-editorial-shadow min-h-14 w-full rounded-full bg-[var(--v2-primary)] px-8 text-lg font-bold text-[var(--v2-on-primary)] transition-transform hover:scale-105 active:scale-95 sm:w-auto"
              >
                <Link href={primaryCtaHref}>{homeMessages.hero.primaryCta}</Link>
              </Button>
            ) : null}

            {secondaryCtaHref ? (
              <Button
                asChild
                size="lg"
                className="min-h-14 w-full rounded-full bg-[#46c2c11a] px-8 py-4 text-lg font-bold text-[var(--v2-secondary)] transition-transform hover:scale-105 active:scale-95 sm:w-auto"
              >
                <Link href={secondaryCtaHref}>{homeMessages.hero.secondaryCta}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-12 -top-12 hidden h-64 w-64 rounded-full bg-[var(--v2-primary-container)] opacity-30 blur-[100px] md:block" />
          <div className="absolute -bottom-12 -left-12 hidden h-64 w-64 rounded-full bg-[var(--v2-secondary-container)] opacity-30 blur-[100px] md:block" />

          <div className="v2-editorial-shadow relative z-10 overflow-hidden rounded-[3rem] bg-[var(--v2-surface-container-lowest)] shadow-[0_12px_28px_-18px_rgba(31,27,23,0.28)] transition-transform duration-700 md:rotate-2 md:hover:rotate-0">
            <div className="relative aspect-[4/3] w-full md:aspect-[4/5]">
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-2 z-20 flex items-center gap-3 rounded-xl border border-[var(--v2-outline-variant)]/20 bg-[var(--v2-surface)]/90 p-4 shadow-lg backdrop-blur-md md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--v2-secondary)] text-[var(--v2-on-secondary)]">
              <HeartIcon className="size-5 fill-current" />
            </div>
            <div>
              <Typography as="p" variant="v2Muted" className="text-xs !font-bold text-[var(--v2-on-surface)]">
                {homeMessages.hero.weeklyHomesTitle}
              </Typography>
              <Typography as="p" variant="v2Muted" className="text-[10px]">
                {homeMessages.hero.weeklyHomesSubtitle}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
