"use client";

import { FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { usePets } from "@/features/adoption/hooks/usePets";
import messages from "@/messages/pt-br.json";
import {
  parseAdoptionSearchParams,
  toAdoptionSearchParams,
} from "@/shared/lib/search-params";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import type { PetFilters, PetSort } from "@/types";

import { AdocaoFilters } from "./AdocaoFilters";
import { AdocaoGrid } from "./AdocaoGrid";
import { AdocaoHero } from "./AdocaoHero";
import { AdocaoToolbar } from "./AdocaoToolbar";

export function AdocaoContent() {
  const router = useRouter();
  const pathname = "/adocao";
  const searchParams = useSearchParams();

  const { filters, page, sort } = useMemo(
    () => parseAdoptionSearchParams(searchParams),
    [searchParams],
  );

  const { data, isLoading, isError, refetch } = usePets(filters, page, sort);
  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const hasActiveFilters =
    !!filters.species ||
    !!filters.size ||
    !!filters.ageGroup ||
    !!filters.city ||
    !!filters.urgentOnly;

  const activeFiltersCount = [
    filters.species,
    filters.size,
    filters.ageGroup,
    filters.city,
    filters.urgentOnly,
  ].filter(Boolean).length;

  const setState = useCallback(
    (next: { filters: PetFilters; page: number; sort: PetSort }) => {
      const params = toAdoptionSearchParams(next);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname],
  );

  const updateFilters = useCallback(
    (partial: Partial<PetFilters>) => {
      setState({
        filters: { ...filters, ...partial },
        page: 1,
        sort,
      });
    },
    [filters, sort, setState],
  );

  const clearFilters = useCallback(() => {
    setState({
      filters: {},
      page: 1,
      sort: "recent",
    });
  }, [setState]);

  const handleSortChange = useCallback(
    (nextSort: PetSort) => {
      setState({ filters, page: 1, sort: nextSort });
    },
    [filters, setState],
  );

  const cityInput = filters.city ?? "";

  const toolbarMessages = messages.adoption.toolbar;

  return (
    <div className="space-y-8">
      <AdocaoHero />

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar: filtros (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Filtros
            </h2>
            <AdocaoFilters
              filters={filters}
              cityInput={cityInput}
              onCityInputChange={(v) => updateFilters({ city: v || undefined })}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </div>
        </aside>

        {/* Área de resultados: toolbar + grid */}
        <div className="min-w-0 space-y-4">
          {/* Mobile: botão Filtrar + Sheet */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <FilterIcon className="size-4" />
                  {toolbarMessages.filterButton}
                  {activeFiltersCount > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" aria-label="Filtros de adoção">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <AdocaoFilters
                    filters={filters}
                    cityInput={cityInput}
                    onCityInputChange={(v) =>
                      updateFilters({ city: v || undefined })
                    }
                    onFiltersChange={updateFilters}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <AdocaoToolbar
            total={total}
            sort={sort}
            onSortChange={handleSortChange}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          <AdocaoGrid
            items={items}
            total={total}
            isLoading={isLoading}
            isError={isError}
            isSuccess={!!data}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    </div>
  );
}
