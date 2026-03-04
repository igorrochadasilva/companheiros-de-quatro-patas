import { NextResponse } from "next/server";

import type { TransparencySummary } from "@/types";

export async function GET() {
  const data: TransparencySummary = {
    monthLabel: "Março/2026",
    totalRaised: 12500,
    totalSpent: 9800,
    balance: 2700,
    lastUpdatedAt: new Date().toISOString(),
    lastExpenses: [
      {
        id: "expense-1",
        label: "Ração e alimentação",
        amount: 4200,
        date: "2026-02-28",
      },
      {
        id: "expense-2",
        label: "Veterinário e exames",
        amount: 3500,
        date: "2026-02-25",
      },
      {
        id: "expense-3",
        label: "Medicamentos",
        amount: 2100,
        date: "2026-02-20",
      },
    ],
  };

  return NextResponse.json(data);
}
