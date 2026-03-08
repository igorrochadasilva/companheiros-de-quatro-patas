import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { BazaarItem, BazaarItemStatus } from "@/types";

export interface FetchBazaarItemsParams {
  query?: string;
  status?: BazaarItemStatus | "all";
  page?: number;
  pageSize?: number;
  includeSold?: boolean;
}

export interface BazaarItemsResponse {
  items: BazaarItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export async function fetchBazaarItems(
  params: FetchBazaarItemsParams = {},
): Promise<BazaarItemsResponse> {
  return apiGet<BazaarItemsResponse>(API_ROUTES.bazaarItems, {
    params: {
      query: params.query,
      status: params.status,
      page: params.page,
      pageSize: params.pageSize,
      includeSold: params.includeSold,
    },
  });
}
