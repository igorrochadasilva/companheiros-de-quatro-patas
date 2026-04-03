import "server-only";

import { transparencySummaryMock } from "@/backend/mock/transparency";

export async function getTransparencySummary() {
  return transparencySummaryMock;
}
