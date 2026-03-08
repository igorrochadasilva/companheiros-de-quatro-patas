import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { Story } from "@/types";

export type StoriesResponse = {
  items: Story[];
};

export async function fetchStories(): Promise<StoriesResponse> {
  return apiGet<StoriesResponse>(API_ROUTES.stories);
}
