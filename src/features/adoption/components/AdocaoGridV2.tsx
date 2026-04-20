"use client";

import { Calendar, Dog, MapPin, PawPrint, Rabbit, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { WHATSAPP_URL } from "@/constants/contact";
import { adoptionMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/ui/empty";
import { Typography } from "@/shared/ui/typography";
import type { Pet } from "@/types";

const emptyMessages = adoptionMessages.empty;
const errorMessages = adoptionMessages.error;
const v2GridMessages = adoptionMessages.v2.grid;

const SPECIES_LABELS: Record<Pet["species"], string> = {
  dog: v2GridMessages.species.dog,
  cat: v2GridMessages.species.cat,
  other: v2GridMessages.species.other,
};

const SPECIES_BADGE_CLASS: Record<Pet["species"], string> = {
  dog: "bg-[color-mix(in_oklab,var(--v2-secondary)_10%,transparent)] text-[var(--v2-secondary)]",
  cat: "bg-[color-mix(in_oklab,var(--v2-primary)_12%,transparent)] text-[var(--v2-primary)]",
  other:
    "bg-[color-mix(in_oklab,var(--v2-tertiary)_10%,transparent)] text-[var(--v2-tertiary)]",
};

const SPECIES_ICON: Record<Pet["species"], typeof Dog> = {
  dog: Dog,
  cat: PawPrint,
  other: Rabbit,
};

const BADGE_LABELS: Record<string, string> = {
  vaccinated: v2GridMessages.badges.vaccinated,
  neutered: v2GridMessages.badges.neutered,
  urgent: v2GridMessages.badges.urgent,
};

function formatPetAge(ageYears: number) {
  if (!Number.isFinite(ageYears) || ageYears <= 0) {
    return v2GridMessages.ageUnknown;
  }
  if (ageYears < 1) {
    const months = Math.max(1, Math.round(ageYears * 12));
    return `${months} ${
      months === 1
        ? v2GridMessages.ageUnits.month
        : v2GridMessages.ageUnits.months
    }`;
  }
  const wholeAge = Number.isInteger(ageYears)
    ? ageYears
    : Number(ageYears.toFixed(1));
  return `${wholeAge} ${
    wholeAge === 1
      ? v2GridMessages.ageUnits.year
      : v2GridMessages.ageUnits.years
  }`;
}

function normalizeImageUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

export interface AdocaoGridV2Props {
  items: Pet[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onRetry: () => void;
}

export function AdocaoGridV2({
  items,
  total,
  isLoading,
  isError,
  isSuccess,
  hasActiveFilters,
  onClearFilters,
  onRetry,
}: AdocaoGridV2Props) {
  useEffect(() => {
    if (isSuccess && items.length > 0) {
      track("view_pet_list", { count: items.length, total });
    }
  }, [isSuccess, items.length, total]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-[var(--v2-outline-variant)]/20 bg-[var(--v2-surface-container-lowest)]"
          >
            <div className="aspect-square animate-pulse bg-[var(--v2-surface-container-high)]" />
            <div className="space-y-3 p-6">
              <div className="h-5 w-36 animate-pulse rounded bg-[var(--v2-surface-container-high)]" />
              <div className="h-4 w-48 animate-pulse rounded bg-[var(--v2-surface-container-high)]" />
              <div className="h-10 w-full animate-pulse rounded-full bg-[var(--v2-surface-container-high)]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>{errorMessages.title}</EmptyTitle>
          <EmptyDescription>
            <Button variant="outline" size="sm" onClick={onRetry}>
              {errorMessages.retry}
            </Button>
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (items.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>{emptyMessages.title}</EmptyTitle>
          <EmptyDescription>{emptyMessages.description}</EmptyDescription>
        </EmptyHeader>
        {hasActiveFilters ? (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            {emptyMessages.clearFilters}
          </Button>
        ) : null}
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {items.map((pet) => {
        const detailPath = `${PUBLIC_ROUTES.adoption}/${pet.id}`;
        const whatsappMessage = encodeURIComponent(
          v2GridMessages.contactWhatsappMessage
            .replace("{name}", pet.name)
            .replace("{id}", pet.id)
            .replace("{url}", detailPath),
        );

        return (
          <article
            key={pet.id}
            className="group overflow-hidden rounded-3xl border border-[var(--v2-outline-variant)]/20 bg-[var(--v2-surface-container-lowest)] transition-shadow hover:shadow-xl"
          >
            <div className="relative h-[270px] overflow-hidden">
              <Image
                src={normalizeImageUrl(pet.imageUrl)}
                alt={pet.name}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {pet.tags.includes("urgent") ? (
                <span className="absolute left-3 top-3 rounded-full bg-[var(--v2-error)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                  {v2GridMessages.urgentBadge}
                </span>
              ) : null}
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Typography
                    as="h3"
                    variant="v2H2"
                    className="!text-4xl !font-bold leading-none"
                  >
                    {pet.name}
                  </Typography>
                </div>
                <div
                  className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full ${SPECIES_BADGE_CLASS[pet.species]}`}
                  aria-label={SPECIES_LABELS[pet.species]}
                  title={SPECIES_LABELS[pet.species]}
                >
                  {(() => {
                    const SpeciesIcon = SPECIES_ICON[pet.species];
                    return <SpeciesIcon className="size-4" />;
                  })()}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--v2-on-surface-variant)]">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {formatPetAge(pet.ageYears)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Ruler className="size-3.5" />
                  {pet.size}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {pet.city}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {pet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[var(--v2-outline-variant)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--v2-on-surface-variant)]"
                  >
                    {BADGE_LABELS[tag] ?? tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-full border-[var(--v2-outline)]/50 bg-transparent font-semibold text-[var(--v2-on-surface)] hover:bg-[var(--v2-surface-container)]"
                >
                  <Link href={detailPath}>{v2GridMessages.detailsCta}</Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-10 rounded-full bg-[var(--v2-secondary)] font-semibold text-white hover:opacity-90">
                      {v2GridMessages.adoptCta}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{pet.name}</DialogTitle>
                      <DialogDescription>
                        {v2GridMessages.dialogDescription}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button asChild variant="outline">
                        <Link
                          href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {v2GridMessages.contactWhatsapp}
                        </Link>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
