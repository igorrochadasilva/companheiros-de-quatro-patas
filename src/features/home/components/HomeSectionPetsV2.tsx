"use client";

import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { useFeaturedPets } from "@/features/home/hooks/useFeaturedPets";
import { homeMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { Typography } from "@/shared/ui/typography";
import type { Pet, PetFilters } from "@/types";

type QuickFilter = "all" | "dogs" | "cats" | "urgent";

const quickFilterOrder: QuickFilter[] = ["all", "dogs", "cats", "urgent"];

const BADGE_LABELS: Record<string, string> = {
  vaccinated: homeMessages.pets.badges.vaccinated,
  neutered: homeMessages.pets.badges.neutered,
  urgent: homeMessages.pets.badges.urgent,
};

function formatPetAge(ageYears: number) {
  if (!Number.isFinite(ageYears) || ageYears <= 0) {
    return "Idade nao informada";
  }

  if (ageYears < 1) {
    const months = Math.max(1, Math.round(ageYears * 12));
    return `${months} ${months === 1 ? "mes" : "meses"}`;
  }

  const roundedYears = Number.isInteger(ageYears)
    ? ageYears
    : Number(ageYears.toFixed(1));

  return `${roundedYears} ${roundedYears === 1 ? "ano" : "anos"}`;
}

function formatPetSize(size: Pet["size"]) {
  if (size === "small") return "Pequeno";
  if (size === "medium") return "Medio";
  return "Grande";
}

function mapQuickFilterToQuery(filter: QuickFilter): PetFilters {
  if (filter === "dogs") return { species: "dog" };
  if (filter === "cats") return { species: "cat" };
  if (filter === "urgent") return { urgentOnly: true };
  return {};
}

function PetCardV2({ pet }: { pet: Pet }) {
  const petPath = `${PUBLIC_ROUTES.adoption}/${pet.id}`;

  return (
    <article className="v2-editorial-shadow group overflow-hidden rounded-xl border border-[var(--v2-outline-variant)]/10 bg-[var(--v2-surface-container-lowest)]">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={pet.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {pet.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--v2-surface)]/85 px-3 py-1 text-xs font-bold text-[var(--v2-on-surface-variant)] backdrop-blur-md"
            >
              {BADGE_LABELS[tag] ?? tag}
            </span>
          ))}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-[var(--v2-surface)]/85 p-2 text-[var(--v2-tertiary)] backdrop-blur-md">
          <HeartIcon className="size-5" aria-hidden />
        </div>
      </div>

      <div className="p-6">
        <Typography
          as="h3"
          variant="v2Body"
          className="v2-font-headline text-2xl !font-bold"
        >
          {pet.name}
        </Typography>
        <Typography as="p" variant="v2Muted" className="mb-6 text-sm">
          {`${formatPetAge(pet.ageYears)} - Porte ${formatPetSize(pet.size)} - ${pet.city}`}
        </Typography>

        <div className="flex gap-3">
          <Button
            asChild
            variant="outline"
            className="h-10 flex-1 rounded-full border-[var(--v2-secondary)] bg-transparent text-sm font-bold text-[var(--v2-secondary)] hover:bg-[var(--v2-secondary)]/5 hover:text-[var(--v2-secondary)]"
          >
            <Link
              href={petPath}
              onClick={() => track("select_pet", { petId: pet.id })}
            >
              {homeMessages.pets.card.seeDetails}
            </Link>
          </Button>
          <Button
            asChild
            className="h-10 flex-1 rounded-full bg-[var(--v2-primary)] text-sm font-bold text-[var(--v2-on-primary)] transition-opacity hover:opacity-90"
          >
            <Link
              href={petPath}
              onClick={() => track("start_adoption", { petId: pet.id })}
            >
              {homeMessages.pets.card.wantToAdopt}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function HomeSectionPetsV2() {
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(1);

  const filters = useMemo(() => mapQuickFilterToQuery(quickFilter), [quickFilter]);
  const { data, isLoading } = useFeaturedPets(filters);

  const items = data?.items ?? [];

  useEffect(() => {
    if (!carouselApi) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    };

    updateCurrentSlide();
    carouselApi.on("select", updateCurrentSlide);
    carouselApi.on("reInit", updateCurrentSlide);

    return () => {
      carouselApi.off("select", updateCurrentSlide);
      carouselApi.off("reInit", updateCurrentSlide);
    };
  }, [carouselApi]);

  useEffect(() => {
    setCurrentSlide(1);
  }, [quickFilter, items.length]);

  return (
    <section id="animais" className="v2-section v2-section-muted scroll-mt-24">
      <div className="v2-container">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Typography as="h2" variant="v2H2" className="mb-4">
              {homeMessages.pets.v2.title}
            </Typography>
            <Typography as="p" variant="v2Muted" className="max-w-xl">
              {homeMessages.pets.v2.subtitle}
            </Typography>
          </div>

          <div className="flex w-full gap-3 overflow-x-auto pb-2 md:w-auto">
            {quickFilterOrder.map((filter) => {
              const isActive = quickFilter === filter;
              return (
                <Button
                  key={filter}
                  variant="ghost"
                  className={[
                    "h-10 rounded-full px-6 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-[var(--v2-primary)] text-[var(--v2-on-primary)] hover:bg-[var(--v2-primary)]"
                      : "bg-[var(--v2-surface-container-highest)] text-[var(--v2-on-surface-variant)] hover:bg-[var(--v2-primary-container)]/20",
                  ].join(" ")}
                  onClick={() => setQuickFilter(filter)}
                >
                  {homeMessages.pets.v2.filters[filter]}
                </Button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="h-[29rem] animate-pulse rounded-xl bg-[var(--v2-surface-container-high)]"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-[var(--v2-outline-variant)]/30 bg-[var(--v2-surface-container-lowest)] p-8 text-center">
            <Typography as="p" variant="v2Body" className="!font-semibold">
              Nenhum pet encontrado para este filtro.
            </Typography>
          </div>
        ) : (
          <>
            <Carousel
              opts={{ align: "start", loop: false }}
              className="w-full"
              setApi={setCarouselApi}
            >
              <CarouselContent className="-ml-0 sm:-ml-4">
                {items.map((pet) => (
                  <CarouselItem
                    key={pet.id}
                    className="basis-[88%] pl-0 sm:pl-4 sm:basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <PetCardV2 pet={pet} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-3 hidden border-[var(--v2-outline-variant)] bg-[var(--v2-surface)] text-[var(--v2-on-surface)] md:inline-flex" />
              <CarouselNext className="-right-3 hidden border-[var(--v2-outline-variant)] bg-[var(--v2-surface)] text-[var(--v2-on-surface)] md:inline-flex" />
            </Carousel>
            <div className="mt-4 text-center md:hidden">
              <Typography as="p" variant="v2Muted" className="text-xs !font-semibold">
                {currentSlide} / {items.length}
              </Typography>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
