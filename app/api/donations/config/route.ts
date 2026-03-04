import { NextResponse } from "next/server";

import type { DonationConfig } from "@/types";

export async function GET() {
  const data: DonationConfig = {
    pixKey: "pix@companheiros4patas.org",
    pixQrCodeUrl: "https://placehold.co/200x200?text=PIX+QR",
    tiers: [
      {
        id: "tier-25",
        amount: 25,
        label: "R$ 25",
        description: "Ajuda com ração por alguns dias.",
      },
      {
        id: "tier-50",
        amount: 50,
        label: "R$ 50",
        description: "Contribui com vacinas e medicamentos.",
      },
      {
        id: "tier-100",
        amount: 100,
        label: "R$ 100",
        description: "Ajuda no custeio de tratamentos mais complexos.",
      },
    ],
  };

  return NextResponse.json(data);
}
