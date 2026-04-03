import { NextResponse } from "next/server";

import { getDonationConfig } from "@/backend/modules/donations/application/get-donation-config";

export async function GET() {
  const data = await getDonationConfig();
  return NextResponse.json(data);
}
