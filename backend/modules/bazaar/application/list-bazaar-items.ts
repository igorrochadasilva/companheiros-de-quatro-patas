import "server-only";

import { bazaarItemsMock } from "@/backend/mock/bazaar";
import {
  type BazaarItem,
  type BazaarItemStatus,
  BazaarItemStatusEnum,
} from "@/types";

type ListBazaarItemsInput = {
  query?: string;
  status?: BazaarItemStatus | "all" | null;
  page?: number;
  pageSize?: number;
  includeSold?: boolean;
};

type BazaarItemsResponse = {
  items: BazaarItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export async function listBazaarItems(
  input: ListBazaarItemsInput,
): Promise<BazaarItemsResponse> {
  const query = input.query?.trim().toLowerCase() ?? "";
  const page = Number(input.page ?? 1);
  const pageSize = Number(input.pageSize ?? 6);
  const includeSold = input.includeSold ?? false;
  const normalizedStatus = input.status ?? "all";

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0
      ? Math.min(Math.floor(pageSize), 24)
      : 6;

  const hideSoldByDefault = normalizedStatus === "all" && !includeSold;

  const filtered = bazaarItemsMock.filter((item) => {
    if (hideSoldByDefault && item.status === BazaarItemStatusEnum.SOLD) {
      return false;
    }
    if (
      normalizedStatus !== "all" &&
      normalizedStatus &&
      item.status !== normalizedStatus
    ) {
      return false;
    }
    if (!query) return true;
    return item.name.toLowerCase().includes(query);
  });

  const start = (safePage - 1) * safePageSize;
  const paginatedItems = filtered.slice(start, start + safePageSize);

  return {
    items: paginatedItems,
    total: filtered.length,
    page: safePage,
    pageSize: safePageSize,
    hasMore: start + safePageSize < filtered.length,
  };
}
