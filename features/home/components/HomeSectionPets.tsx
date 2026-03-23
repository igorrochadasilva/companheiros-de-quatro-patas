"use client";

import Link from "next/link";
import { useEffect } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { useFeaturedPets } from "@/features/home/hooks/useFeaturedPets";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import messages from "@/messages/pt-br.json";
import { usePetFilters } from "@/shared/hooks/usePetFilters";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/ui/empty";
import { H2 } from "@/shared/ui/typography";

import { HomeSectionPetsCard } from "./HomeSectionPetsCard";
import { HomeSectionPetsFilters } from "./HomeSectionPetsFilters";
import { HomeSectionPetsSkeleton } from "./HomeSectionPetsSkeleton";

const petsMessages = messages.home.pets;

/** Cópia local: lista vazia por filtros não está no Contentful. */
const PETS_EMPTY_LIST = {
  title: "Nenhum resultado com esses filtros",
  description:
    "Altere os filtros ou limpe tudo para ver mais opções de animais.",
} as const;

export function HomeSectionPets() {
  const { filters, cityInput, setCityInput, updateFilters, clearFilters } =
    usePetFilters();

  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const { data, isLoading, isSuccess } = useFeaturedPets(filters);
  const items = data?.items ?? [];

  const sectionTitle = cms?.petsTitle?.trim() ?? "";
  const seeAllLabel = cms?.petsSeeAll?.trim() ?? "";
  const seeAllHref = cms?.petsSeeAllHref || PUBLIC_ROUTES.adoption;

  useEffect(() => {
    if (isSuccess && items.length > 0) {
      track("view_pet_list", { count: items.length, filters });
    }
  }, [isSuccess, items.length, filters]);

  return (
    <section id="animais" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {isCmsPending ? (
          <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
        ) : (
          sectionTitle && <H2>{sectionTitle}</H2>
        )}
        {isCmsPending ? (
          <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
        ) : (
          seeAllLabel && (
            <Button asChild variant="outline" size="sm">
              <Link href={seeAllHref}>{seeAllLabel}</Link>
            </Button>
          )
        )}
      </div>

      <HomeSectionPetsFilters
        filters={filters}
        cityInput={cityInput}
        onCityInputChange={setCityInput}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <HomeSectionPetsSkeleton />
      ) : items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{PETS_EMPTY_LIST.title}</EmptyTitle>
            <EmptyDescription>{PETS_EMPTY_LIST.description}</EmptyDescription>
          </EmptyHeader>
          <Button onClick={clearFilters}>{petsMessages.clearFilters}</Button>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((pet) => (
            <HomeSectionPetsCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </section>
  );
}
