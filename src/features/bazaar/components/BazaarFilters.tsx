"use client";

import { SearchIcon } from "lucide-react";

import {
  BAZAAR_STATUS_OPTIONS,
  type BazaarStatusFilter,
  BazaarStatusFilterEnum,
} from "@/features/bazaar/hooks/useBazaarFilters";
import { bazaarMessages } from "@/messages";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { BazaarItemStatusEnum } from "@/types";

interface BazaarFiltersProps {
  query: string;
  status: BazaarStatusFilter;
  total: number;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: BazaarStatusFilter) => void;
}

export function BazaarFilters({
  query,
  status,
  total,
  onQueryChange,
  onStatusChange,
}: BazaarFiltersProps) {
  return (
    <section className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-center">
        <label className="relative block">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={bazaarMessages.filters.searchPlaceholder}
            className="pl-9"
            aria-label={bazaarMessages.filters.searchAriaLabel}
          />
        </label>

        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as BazaarStatusFilter)}
        >
          <SelectTrigger
            className="w-full"
            aria-label={bazaarMessages.filters.statusAriaLabel}
          >
            <SelectValue
              placeholder={bazaarMessages.filters.statusPlaceholder}
            />
          </SelectTrigger>
          <SelectContent>
            {BAZAAR_STATUS_OPTIONS.map((option) => {
              const label =
                option === BazaarStatusFilterEnum.ALL
                  ? bazaarMessages.filters.statusAll
                  : option === BazaarItemStatusEnum.AVAILABLE
                    ? bazaarMessages.filters.statusAvailable
                    : option === BazaarItemStatusEnum.RESERVED
                      ? bazaarMessages.filters.statusReserved
                      : bazaarMessages.filters.statusSold;

              return (
                <SelectItem key={option} value={option}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {bazaarMessages.filters.resultsLabel.replace(
            "{count}",
            String(total),
          )}
        </p>
      </div>
    </section>
  );
}
