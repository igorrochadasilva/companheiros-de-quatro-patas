import "server-only";

import { shelterProgressMock } from "@/backend/mock/shelter";

export async function getShelterProgress() {
  return shelterProgressMock;
}
