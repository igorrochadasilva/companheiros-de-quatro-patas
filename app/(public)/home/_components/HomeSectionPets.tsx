"use client";

import Link from "next/link";
import { useEffect } from "react";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { useFeaturedPets } from "@/shared/hooks/useFeaturedPets";
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

export function HomeSectionPets() {
  const { filters, cityInput, setCityInput, updateFilters, clearFilters } =
    usePetFilters();

  const { data, isLoading, isSuccess } = useFeaturedPets(filters);
  const items = data?.items ?? [];

  useEffect(() => {
    if (isSuccess && items.length > 0) {
      track("view_pet_list", { count: items.length, filters });
    }
  }, [isSuccess, items.length, filters]);

  return (
    <section id="animais" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <H2>{petsMessages.title}</H2>
        <Button asChild variant="outline" size="sm">
          <Link href={PUBLIC_ROUTES.adoption}>{petsMessages.seeAll}</Link>
        </Button>
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
            <EmptyTitle>{petsMessages.emptyTitle}</EmptyTitle>
            <EmptyDescription>{petsMessages.emptyDescription}</EmptyDescription>
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
