import { sendGTMEvent } from "@next/third-parties/google";

import type { AnalyticsEventName } from "@/constants";

type AnalyticsPayload = Record<string, unknown>;

type DataLayerEvent = AnalyticsPayload & {
  event: AnalyticsEventName;
};

export function track(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  const eventPayload: DataLayerEvent = {
    event,
    ...(payload ?? {}),
  };

  if (typeof window === "undefined") return;

  try {
    sendGTMEvent(eventPayload);
  } catch {
    // Fallback defensivo: garante o push mesmo sem GTM ativo.
    const dataLayer = (window as Window & { dataLayer?: object[] }).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push(eventPayload);
      return;
    }

    (window as Window & { dataLayer?: object[] }).dataLayer = [eventPayload];
  }
}
