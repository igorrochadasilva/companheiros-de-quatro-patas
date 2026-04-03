import "server-only";

import { storiesMock } from "@/backend/mock/stories";

export async function listStories() {
  return storiesMock;
}
