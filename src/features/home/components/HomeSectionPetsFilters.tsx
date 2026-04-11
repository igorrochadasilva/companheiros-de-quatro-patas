"use client";
import { homeMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import type { PetAgeGroup, PetFilters, PetSize, PetSpecies } from "@/types";

const petsMessages = homeMessages.pets;

export interface HomeSectionPetsFiltersProps {
  filters: PetFilters;
  cityInput: string;
  onCityInputChange: (value: string) => void;
  onFiltersChange: (next: Partial<PetFilters>) => void;
  onClearFilters: () => void;
}

export function HomeSectionPetsFilters({
  filters,
  cityInput,
  onCityInputChange,
  onFiltersChange,
  onClearFilters,
}: HomeSectionPetsFiltersProps) {
  const hasActiveFilters =
    !!filters.species ||
    !!filters.size ||
    !!filters.ageGroup ||
    !!filters.city ||
    !!filters.urgentOnly;

  return (
    <div className="space-y-4">
      <Tabs
        value={filters.species ?? "all"}
        onValueChange={(v) =>
          onFiltersChange({
            species: (v === "all" ? undefined : v) as PetSpecies,
          })
        }
      >
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">{petsMessages.filters.all}</TabsTrigger>
          <TabsTrigger value="dog">{petsMessages.filters.dog}</TabsTrigger>
          <TabsTrigger value="cat">{petsMessages.filters.cat}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={filters.size ?? ""}
          onValueChange={(v) =>
            onFiltersChange({ size: (v || undefined) as PetSize })
          }
        >
          <SelectTrigger className="w-[140px]" size="sm">
            <SelectValue placeholder={petsMessages.filters.size} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">
              {petsMessages.filters.sizeSmall}
            </SelectItem>
            <SelectItem value="medium">
              {petsMessages.filters.sizeMedium}
            </SelectItem>
            <SelectItem value="large">
              {petsMessages.filters.sizeLarge}
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.ageGroup ?? ""}
          onValueChange={(v) =>
            onFiltersChange({ ageGroup: (v || undefined) as PetAgeGroup })
          }
        >
          <SelectTrigger className="w-[140px]" size="sm">
            <SelectValue placeholder={petsMessages.filters.age} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="puppy">
              {petsMessages.filters.agePuppy}
            </SelectItem>
            <SelectItem value="adult">
              {petsMessages.filters.ageAdult}
            </SelectItem>
            <SelectItem value="senior">
              {petsMessages.filters.ageSenior}
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder={petsMessages.filters.cityPlaceholder}
          value={cityInput}
          onChange={(e) => onCityInputChange(e.target.value)}
          className="w-[180px]"
        />
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={filters.urgentOnly ?? false}
            onCheckedChange={(c) => onFiltersChange({ urgentOnly: c === true })}
          />
          {petsMessages.filters.urgent}
        </label>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
          >
            {petsMessages.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
