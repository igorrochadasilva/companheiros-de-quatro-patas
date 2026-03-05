type AnalyticsEventName =
  | "view_pet_list"
  | "filter_pets"
  | "sort_pets"
  | "clear_filters"
  | "select_pet"
  | "start_adoption"
  | "donate_click"
  | "pix_copy";

type AnalyticsPayload = Record<string, unknown>;

export function track(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload ?? {});
  }

  // Integração real (GA, Meta, etc.) pode ser adicionada aqui.
}
