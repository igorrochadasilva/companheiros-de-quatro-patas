"use client";
import { adoptionMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { PetSort } from "@/types";

const toolbarMessages = adoptionMessages.toolbar;

const SORT_OPTIONS: { value: PetSort; label: string }[] = [
  { value: "recent", label: toolbarMessages.sortRecent },
  { value: "urgent", label: toolbarMessages.sortUrgent },
  { value: "age_asc", label: toolbarMessages.sortAgeAsc },
  { value: "age_desc", label: toolbarMessages.sortAgeDesc },
  { value: "name_asc", label: toolbarMessages.sortName },
];

export interface AdocaoToolbarProps {
  total: number;
  sort: PetSort;
  onSortChange: (sort: PetSort) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function AdocaoToolbar({
  total,
  sort,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
}: AdocaoToolbarProps) {
  const countText =
    total === 0
      ? toolbarMessages.resultsCountNone
      : toolbarMessages.resultsCount.replace("{count}", String(total));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{countText}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={sort}
          onValueChange={(v) => {
            onSortChange(v as PetSort);
            track("sort_pets", { sort: v });
          }}
        >
          <SelectTrigger size="sm" className="w-[200px]">
            <SelectValue placeholder={toolbarMessages.sortLabel} />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onClearFilters();
              track("clear_filters", {});
            }}
          >
            {toolbarMessages.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
}
