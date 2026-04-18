"use client";

import { SlidersHorizontal } from "lucide-react";

import { adoptionMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Typography } from "@/shared/ui/typography";
import type { PetSort } from "@/types";

const toolbarMessages = adoptionMessages.toolbar;
const v2ToolbarMessages = adoptionMessages.v2.toolbar;

const SORT_OPTIONS: { value: PetSort; label: string }[] = [
  { value: "recent", label: toolbarMessages.sortRecent },
  { value: "urgent", label: toolbarMessages.sortUrgent },
  { value: "age_asc", label: toolbarMessages.sortAgeAsc },
  { value: "age_desc", label: toolbarMessages.sortAgeDesc },
  { value: "name_asc", label: toolbarMessages.sortName },
];

export type AdocaoToolbarV2Props = {
  total: number;
  sort: PetSort;
  onSortChange: (sort: PetSort) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  activeFiltersCount: number;
  onOpenMobileFilters: () => void;
};

export function AdocaoToolbarV2({
  total,
  sort,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  activeFiltersCount,
  onOpenMobileFilters,
}: AdocaoToolbarV2Props) {
  const countText =
    total === 0
      ? toolbarMessages.resultsCountNone
      : toolbarMessages.resultsCount.replace("{count}", String(total));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 md:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={onOpenMobileFilters}
          className="h-10 rounded-full border-[var(--v2-outline-variant)] bg-[var(--v2-surface-container-highest)] px-4 text-[var(--v2-on-surface)]"
        >
          <SlidersHorizontal className="size-4" />
          {v2ToolbarMessages.mobileFilterButton}
          {activeFiltersCount > 0 ? (
            <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-[var(--v2-secondary)] text-[10px] text-white">
              {activeFiltersCount}
            </span>
          ) : null}
        </Button>
        <div className="flex items-center gap-2">
          <Typography as="span" variant="v2Muted" className="text-xs">
            {v2ToolbarMessages.mobileSortLabel}
          </Typography>
          <Select value={sort} onValueChange={(value) => onSortChange(value as PetSort)}>
            <SelectTrigger className="h-10 w-[140px] rounded-full border-none bg-[var(--v2-surface-container-low)] px-4 text-xs font-semibold text-[var(--v2-on-surface)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="hidden items-center justify-between gap-4 md:flex">
        <div>
          <Typography as="p" variant="v2H2" className="!text-5xl !font-bold">
            {countText}
          </Typography>
          <Typography as="p" variant="v2Muted" className="mt-1 text-sm">
            {v2ToolbarMessages.desktopResultsContext}
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Typography
            as="span"
            variant="v2Muted"
            className="text-sm !font-semibold text-[var(--v2-on-surface)]"
          >
            {v2ToolbarMessages.desktopSortLabel}
          </Typography>
          <Select value={sort} onValueChange={(value) => onSortChange(value as PetSort)}>
            <SelectTrigger className="h-10 w-[190px] rounded-full border-none bg-[var(--v2-surface-container-low)] px-5 text-sm font-medium text-[var(--v2-on-surface-variant)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onClearFilters}
              className="text-[var(--v2-secondary)] hover:bg-[color-mix(in_oklab,var(--v2-secondary)_10%,transparent)]"
            >
              {toolbarMessages.clearFilters}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
