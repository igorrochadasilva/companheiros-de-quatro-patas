import { sendGTMEvent } from "@next/third-parties/google";

import type { AnalyticsEventName } from "@/constants";

type AnalyticsPayload = Record<string, unknown>;

type DataLayerEvent = AnalyticsPayload & {
  event: AnalyticsEventName;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

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
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(eventPayload);
  }
}
