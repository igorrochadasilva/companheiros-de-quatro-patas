"use client";

import { FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { usePets } from "@/features/adoption/hooks/usePets";
import { adoptionMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import {
  parseAdoptionSearchParams,
  toAdoptionSearchParams,
} from "@/shared/lib/search-params";
import { Button } from "@/shared/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
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
  const totalPages = data?.totalPages ?? 1;

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

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === page || nextPage < 1 || nextPage > totalPages) return;
      setState({ filters, page: nextPage, sort });
      track("paginate", { page: nextPage });
    },
    [filters, page, sort, totalPages, setState],
  );

  const cityInput = filters.city ?? "";

  const toolbarMessages = adoptionMessages.toolbar;

  // Páginas vizinhas (max 5) com reticências
  const pages = useMemo(() => {
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesAround = 1;
    const start = Math.max(2, page - pagesAround);
    const end = Math.min(totalPages - 1, page + pagesAround);

    const result: number[] = [1];
    for (let p = start; p <= end; p += 1) {
      if (!result.includes(p)) result.push(p);
    }
    if (!result.includes(totalPages)) result.push(totalPages);

    return result.sort((a, b) => a - b);
  }, [page, totalPages]);

  const showLeftEllipsis = pages.length > 0 && pages[0] > 2;
  const showRightEllipsis =
    pages.length > 0 && pages[pages.length - 1] < totalPages - 1;

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
          <h2 className="sr-only">{adoptionMessages.resultsHeading}</h2>
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

          {totalPages > 1 && (
            <Pagination className="pt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(page - 1);
                    }}
                  />
                </PaginationItem>

                {showLeftEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {pages.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={(event) => {
                        event.preventDefault();
                        handlePageChange(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {showRightEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageChange(page + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
