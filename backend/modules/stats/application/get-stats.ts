import "server-only";

import { statsMock } from "@/backend/mock/stats";

export async function getStats() {
  return statsMock;
}
