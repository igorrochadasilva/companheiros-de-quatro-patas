import "server-only";

import { bazaarItemsMock } from "@/backend/mock/bazaar";
import { BazaarItemStatusEnum } from "@/types";

export async function listFeaturedBazaarItems() {
  return bazaarItemsMock
    .filter((item) => item.status !== BazaarItemStatusEnum.SOLD)
    .slice(0, 4);
}
