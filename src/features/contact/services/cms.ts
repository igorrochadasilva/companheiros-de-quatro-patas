import { API_ROUTES } from "@/constants";
import { apiGet } from "@/shared/lib/api";
import type { ContactCmsContent } from "@/types";

export async function fetchContactCmsContent(): Promise<ContactCmsContent> {
  return apiGet<ContactCmsContent>(API_ROUTES.contactCms);
}

