"use client";

import { Dog, PawPrint, Rabbit, RotateCcw } from "lucide-react";

import { adoptionMessages, homeMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/lib/utils";
import type { PetAgeGroup, PetFilters, PetSize, PetSpecies } from "@/types";

const petsMessages = homeMessages.pets;
const filtersMessages = adoptionMessages.v2.filters;

export interface AdocaoFiltersV2Props {
  filters: PetFilters;
  cityInput: string;
  availableOptions: {
    species: PetSpecies[];
    sizes: PetSize[];
    ageGroups: PetAgeGroup[];
    cities: string[];
  };
  onCityInputChange: (value: string) => void;
  onFiltersChange: (next: Partial<PetFilters>) => void;
  onClearFilters: () => void;
}

const SPECIES_LABELS: Record<PetSpecies, string> = {
  dog: petsMessages.filters.dog,
  cat: petsMessages.filters.cat,
  other: filtersMessages.otherSpecies,
};

const SIZE_LABELS: Record<PetSize, string> = {
  small: petsMessages.filters.sizeSmall,
  medium: petsMessages.filters.sizeMedium,
  large: petsMessages.filters.sizeLarge,
};

const AGE_LABELS: Record<PetAgeGroup, string> = {
  puppy: petsMessages.filters.agePuppy,
  adult: petsMessages.filters.ageAdult,
  senior: petsMessages.filters.ageSenior,
};

export function AdocaoFiltersV2({
  filters,
  cityInput,
  availableOptions,
  onCityInputChange,
  onFiltersChange,
  onClearFilters,
}: AdocaoFiltersV2Props) {
  const hasActiveFilters =
    !!filters.species ||
    !!filters.size ||
    !!filters.ageGroup ||
    !!filters.city ||
    !!filters.urgentOnly;

  const speciesItems: Array<{ value: "all" | PetSpecies; label: string }> = [
    { value: "all", label: filtersMessages.allSpecies },
    ...availableOptions.species.map((species) => ({
      value: species,
      label: SPECIES_LABELS[species],
    })),
  ];

  const cityOptions = cityInput.trim()
    ? Array.from(new Set([...availableOptions.cities, cityInput.trim()]))
    : availableOptions.cities;

  return (
    <div className="rounded-3xl bg-[var(--v2-surface-container-low)] p-6">
      <div className="mb-5">
        <Typography
          as="h2"
          variant="v2H2"
          className="text-3xl !font-bold text-[var(--v2-on-surface)]"
        >
          {filtersMessages.title}
        </Typography>
        <Typography as="p" variant="v2Muted" className="mt-1 !text-xs">
          {filtersMessages.subtitle}
        </Typography>
      </div>

      <div className="space-y-5">
        <div>
          <Typography as="p" variant="v2Label" className="mb-2">
            {filtersMessages.speciesLabel}
          </Typography>
          <div className="space-y-1.5">
            {speciesItems.map((item) => {
              const isActive =
                item.value === "all"
                  ? !filters.species
                  : filters.species === item.value;

              const Icon =
                item.value === "dog"
                  ? Dog
                  : item.value === "cat"
                    ? PawPrint
                    : item.value === "other"
                      ? Rabbit
                      : PawPrint;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      species:
                        item.value === "all"
                          ? undefined
                          : (item.value as PetSpecies),
                    })
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-r-full px-4 py-3 text-left text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-[color-mix(in_oklab,var(--v2-secondary)_12%,transparent)] text-[var(--v2-secondary)]"
                      : "text-[var(--v2-on-surface-variant)] hover:bg-[var(--v2-surface-container)]",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Typography as="p" variant="v2Label" className="mb-2">
              {filtersMessages.sizeLabel}
            </Typography>
            <Select
              value={filters.size ?? "__all__"}
              onValueChange={(value) =>
                onFiltersChange({
                  size: (value === "__all__" ? undefined : value) as
                    | PetSize
                    | undefined,
                })
              }
            >
              <SelectTrigger className="h-11 border-none bg-[var(--v2-surface-container-lowest)] text-[var(--v2-on-surface)]">
                <SelectValue placeholder={filtersMessages.anySize} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">{filtersMessages.anySize}</SelectItem>
                {availableOptions.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {SIZE_LABELS[size]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Typography as="p" variant="v2Label" className="mb-2">
              {filtersMessages.ageLabel}
            </Typography>
            <Select
              value={filters.ageGroup ?? "__all__"}
              onValueChange={(value) =>
                onFiltersChange({
                  ageGroup: (value === "__all__" ? undefined : value) as
                    | PetAgeGroup
                    | undefined,
                })
              }
            >
              <SelectTrigger className="h-11 border-none bg-[var(--v2-surface-container-lowest)] text-[var(--v2-on-surface)]">
                <SelectValue placeholder={filtersMessages.anyAge} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">{filtersMessages.anyAge}</SelectItem>
                {availableOptions.ageGroups.map((ageGroup) => (
                  <SelectItem key={ageGroup} value={ageGroup}>
                    {AGE_LABELS[ageGroup]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Typography as="p" variant="v2Label" className="mb-2">
              {filtersMessages.cityLabel}
            </Typography>
            <Select
              value={filters.city ?? "__all__"}
              onValueChange={(value) =>
                onCityInputChange(value === "__all__" ? "" : value)
              }
            >
              <SelectTrigger className="h-11 border-none bg-[var(--v2-surface-container-lowest)] text-[var(--v2-on-surface)]">
                <SelectValue placeholder={filtersMessages.allCities} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">{filtersMessages.allCities}</SelectItem>
                {cityOptions.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[var(--v2-on-surface)]">
          <Checkbox
            checked={filters.urgentOnly ?? false}
            onCheckedChange={(checked) =>
              onFiltersChange({ urgentOnly: checked === true })
            }
            className="data-[state=checked]:border-[var(--v2-secondary)] data-[state=checked]:bg-[var(--v2-secondary)]"
          />
          {filtersMessages.urgentOnly}
        </label>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
            className="h-11 w-full rounded-full border-[var(--v2-secondary)]/30 bg-transparent font-semibold text-[var(--v2-secondary)] hover:bg-[color-mix(in_oklab,var(--v2-secondary)_8%,transparent)]"
          >
            <RotateCcw className="size-4" />
            {filtersMessages.clearFilters}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
