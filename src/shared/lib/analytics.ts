type AnalyticsEventName =
  | "view_pet_list"
  | "filter_pets"
  | "sort_pets"
  | "clear_filters"
  | "paginate"
  | "adoption_contact_whatsapp"
  | "adoption_contact_form"
  | "select_pet"
  | "start_adoption"
  | "donate_click"
  | "pix_copy"
  | "donate_tier_click"
  | "open_whatsapp"
  | "view_abrigo"
  | "expand_milestone"
  | "open_email"
  | "submit_contact"
  | "contact_success"
  | "contact_error"
  | "prefill_contact"
  | "view_transparency";

type AnalyticsPayload = Record<string, unknown>;

export function track(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload ?? {});
  }

  // Integração real (GA, Meta, etc.) pode ser adicionada aqui.
}
