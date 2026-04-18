"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { usePets } from "@/features/adoption/hooks/usePets";
import { adoptionMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import {
  parseAdoptionSearchParams,
  toAdoptionSearchParams,
} from "@/shared/lib/search-params";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import type { PetFilters, PetSort } from "@/types";

import { AdocaoFiltersV2 } from "./AdocaoFiltersV2";
import { AdocaoGridV2 } from "./AdocaoGridV2";
import { AdocaoHeroV2 } from "./AdocaoHeroV2";
import { AdocaoToolbarV2 } from "./AdocaoToolbarV2";

const PATHNAME = "/adocao";
const paginationMessages = adoptionMessages.v2.pagination;
const sheetMessages = adoptionMessages.v2.sheet;

function buildPages(currentPage: number, totalPages: number) {
  const maxPagesToShow = 5;
  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pagesAround = 1;
  const start = Math.max(2, currentPage - pagesAround);
  const end = Math.min(totalPages - 1, currentPage + pagesAround);

  const pages: number[] = [1];
  for (let page = start; page <= end; page += 1) {
    if (!pages.includes(page)) pages.push(page);
  }
  if (!pages.includes(totalPages)) pages.push(totalPages);

  return pages.sort((left, right) => left - right);
}

export function AdocaoContentV2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const emptyFilters = useMemo<PetFilters>(() => ({}), []);

  const { filters, page, sort } = useMemo(
    () => parseAdoptionSearchParams(searchParams),
    [searchParams],
  );

  const { data, isLoading, isError, isSuccess, refetch } = usePets(
    filters,
    page,
    sort,
  );
  const { data: baseFiltersData } = usePets(emptyFilters, 1, "recent");

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
    (nextState: { filters: PetFilters; page: number; sort: PetSort }) => {
      const params = toAdoptionSearchParams(nextState);
      const query = params.toString();
      router.push(query ? `${PATHNAME}?${query}` : PATHNAME);
    },
    [router],
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
      setState({
        filters,
        page: 1,
        sort: nextSort,
      });
      track("sort_pets", { sort: nextSort });
    },
    [filters, setState],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
      setState({
        filters,
        page: nextPage,
        sort,
      });
      track("paginate", { page: nextPage });
    },
    [filters, page, sort, totalPages, setState],
  );

  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);
  const showLeftEllipsis = pages.length > 0 && pages[0] > 2;
  const showRightEllipsis =
    pages.length > 0 && pages[pages.length - 1] < totalPages - 1;

  const cityInput = filters.city ?? "";
  const filterSourceItems = baseFiltersData?.items?.length
    ? baseFiltersData.items
    : items;

  const availableFilterOptions = useMemo(() => {
    const species = Array.from(
      new Set(filterSourceItems.map((pet) => pet.species)),
    );
    const sizes = Array.from(new Set(filterSourceItems.map((pet) => pet.size)));
    const ageGroups = Array.from(
      new Set(filterSourceItems.map((pet) => pet.ageGroup)),
    );
    const cities = Array.from(
      new Set(filterSourceItems.map((pet) => pet.city)),
    );

    return { species, sizes, ageGroups, cities };
  }, [filterSourceItems]);

  return (
    <div className="bg-[var(--v2-surface)]">
      <AdocaoHeroV2 />

      <section className="v2-section !pt-12 bg-[var(--v2-surface)]">
        <div className="v2-container flex flex-col gap-10 md:flex-row">
          <aside className="hidden w-[300px] shrink-0 md:block">
            <div className="sticky top-24">
              <AdocaoFiltersV2
                filters={filters}
                cityInput={cityInput}
                availableOptions={availableFilterOptions}
                onCityInputChange={(value) =>
                  updateFilters({ city: value || undefined })
                }
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-8">
            <AdocaoToolbarV2
              total={total}
              sort={sort}
              onSortChange={handleSortChange}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
              onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            />

            <AdocaoGridV2
              items={items}
              total={total}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              onRetry={() => refetch()}
            />

            {totalPages > 1 ? (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--v2-outline-variant)] text-[var(--v2-on-surface-variant)] transition-colors hover:bg-[var(--v2-surface-container)] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={paginationMessages.previous}
                >
                  <ChevronLeft className="size-4" />
                </button>

                {showLeftEllipsis ? (
                  <span className="px-1 text-[var(--v2-on-surface-variant)]">
                    ...
                  </span>
                ) : null}

                {pages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    className={[
                      "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      pageNumber === page
                        ? "bg-[var(--v2-primary)] text-white shadow-md shadow-[var(--v2-primary)]/30"
                        : "text-[var(--v2-on-surface)] hover:bg-[var(--v2-surface-container)]",
                    ].join(" ")}
                    aria-current={pageNumber === page ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                ))}

                {showRightEllipsis ? (
                  <span className="px-1 text-[var(--v2-on-surface-variant)]">
                    ...
                  </span>
                ) : null}

                <button
                  type="button"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--v2-outline-variant)] text-[var(--v2-on-surface-variant)] transition-colors hover:bg-[var(--v2-surface-container)] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={paginationMessages.next}
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent
          side="left"
          className="flex w-[85vw] max-w-sm flex-col border-[#d5c4af] bg-[#faf7f2] p-0 opacity-100"
        >
          <SheetHeader className="border-b border-[#d5c4af]/40 px-6 py-4">
            <SheetTitle className="v2-font-headline text-2xl">
              {sheetMessages.title}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4 pb-20">
            <AdocaoFiltersV2
              filters={filters}
              cityInput={cityInput}
              availableOptions={availableFilterOptions}
              onCityInputChange={(value) =>
                updateFilters({ city: value || undefined })
              }
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
