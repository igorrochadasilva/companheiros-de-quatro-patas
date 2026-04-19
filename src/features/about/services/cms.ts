import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { AboutCmsContent } from "@/types";

export async function fetchAboutCmsContent(): Promise<AboutCmsContent> {
  return apiGet<AboutCmsContent>(API_ROUTES.aboutCms);
}
