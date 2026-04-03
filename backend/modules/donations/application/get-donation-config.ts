import "server-only";

import { donationConfigMock } from "@/backend/mock/donations";

export async function getDonationConfig() {
  return donationConfigMock;
}
