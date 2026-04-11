import { bazaarMessages } from "@/messages";
import { Skeleton } from "@/shared/ui/skeleton";
import type { BazaarItem } from "@/types";

import { BazaarCard } from "./BazaarCard";
import { BazaarEmptyState } from "./BazaarEmptyState";

interface BazaarGridProps {
  items: BazaarItem[];
  isLoading: boolean;
  isError: boolean;
}

export function BazaarGrid({ items, isLoading, isError }: BazaarGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-lg border p-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        {bazaarMessages.grid.error}
      </div>
    );
  }

  if (items.length === 0) {
    return <BazaarEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <BazaarCard key={item.id} item={item} />
      ))}
    </div>
  );
}
