import { API_ROUTES } from "@/constants";
import type { ContactFormData } from "@/features/contact/contact.types";

export interface SubmitContactResponse {
  ok: boolean;
}

export async function submitContact(
  payload: ContactFormData,
): Promise<SubmitContactResponse> {
  const response = await fetch(API_ROUTES.contact, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as SubmitContactResponse;
}
