"use client";

import { useEffect } from "react";

import { HomeSectionPetsCard } from "@/features/home/components/HomeSectionPetsCard";
import { HomeSectionPetsSkeleton } from "@/features/home/components/HomeSectionPetsSkeleton";
import messages from "@/messages/pt-br.json";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/ui/empty";
import type { Pet } from "@/types";

const emptyMessages = messages.adoption.empty;
const errorMessages = messages.adoption.error;

export interface AdocaoGridProps {
  items: Pet[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onRetry: () => void;
}

export function AdocaoGrid({
  items,
  total,
  isLoading,
  isError,
  isSuccess,
  hasActiveFilters,
  onClearFilters,
  onRetry,
}: AdocaoGridProps) {
  useEffect(() => {
    if (isSuccess && items.length > 0) {
      track("view_pet_list", { count: items.length, total });
    }
  }, [isSuccess, items.length, total]);

  if (isLoading) {
    return <HomeSectionPetsSkeleton />;
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
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            {emptyMessages.clearFilters}
          </Button>
        )}
      </Empty>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((pet) => (
        <HomeSectionPetsCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
