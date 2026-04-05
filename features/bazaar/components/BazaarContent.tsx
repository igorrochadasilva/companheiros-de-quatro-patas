"use client";

import { useBazaarFilters } from "@/features/bazaar/hooks/useBazaarFilters";
import { useBazaarItems } from "@/features/bazaar/hooks/useBazaarItems";
import { bazaarMessages } from "@/messages";
import { Button } from "@/shared/ui/button";

import { BazaarFilters } from "./BazaarFilters";
import { BazaarGrid } from "./BazaarGrid";
import { BazaarHero } from "./BazaarHero";

export function BazaarContent() {
  const {
    query,
    status,
    page,
    pageSize,
    setQuery,
    setStatus,
    goToNextPage,
    goToPreviousPage,
  } = useBazaarFilters();

  const { data, isLoading, isError, isFetching } = useBazaarItems({
    query,
    status,
    page,
    pageSize,
  });

  const total = data?.total ?? 0;
  const hasMore = data?.hasMore ?? false;
  const items = data?.items ?? [];

  return (
    <div className="space-y-8">
      <BazaarHero />

      <BazaarFilters
        query={query}
        status={status}
        total={total}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      <BazaarGrid items={items} isLoading={isLoading} isError={isError} />

      {!isLoading && !isError && total > pageSize ? (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousPage}
            disabled={page <= 1 || isFetching}
          >
            {bazaarMessages.pagination.previous}
          </Button>
          <span className="text-sm text-muted-foreground">
            {bazaarMessages.pagination.currentPage.replace(
              "{page}",
              String(page),
            )}
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={goToNextPage}
            disabled={!hasMore || isFetching}
          >
            {bazaarMessages.pagination.next}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
