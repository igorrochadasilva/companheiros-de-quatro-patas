"use client";

import { useMemo, useState } from "react";

import { type BazaarItemStatus, BazaarItemStatusEnum } from "@/types";

export enum BazaarStatusFilterEnum {
  ALL = "all",
}

export type BazaarStatusFilter = BazaarItemStatus | BazaarStatusFilterEnum;

interface UseBazaarFiltersOptions {
  initialStatus?: BazaarStatusFilter;
  initialPageSize?: number;
}

export function useBazaarFilters(options: UseBazaarFiltersOptions = {}) {
  const { initialStatus = BazaarStatusFilterEnum.ALL, initialPageSize = 6 } =
    options;

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BazaarStatusFilter>(initialStatus);
  const [page, setPage] = useState(1);

  const pageSize = initialPageSize;

  const params = useMemo(
    () => ({ query, status, page, pageSize }),
    [query, status, page, pageSize],
  );

  const updateQuery = (value: string) => {
    setPage(1);
    setQuery(value);
  };

  const updateStatus = (value: BazaarStatusFilter) => {
    setPage(1);
    setStatus(value);
  };

  const goToNextPage = () => setPage((prev) => prev + 1);
  const goToPreviousPage = () => setPage((prev) => Math.max(1, prev - 1));

  return {
    query,
    status,
    page,
    pageSize,
    params,
    setQuery: updateQuery,
    setStatus: updateStatus,
    goToNextPage,
    goToPreviousPage,
  };
}

export const BAZAAR_STATUS_OPTIONS = [
  BazaarStatusFilterEnum.ALL,
  BazaarItemStatusEnum.AVAILABLE,
  BazaarItemStatusEnum.RESERVED,
  BazaarItemStatusEnum.SOLD,
] as const;
