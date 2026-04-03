import type { TransparencySummary } from "@/types";

export const transparencySummaryMock: TransparencySummary = {
  monthLabel: "Marco/2026",
  totalRaised: 12500,
  totalSpent: 9800,
  balance: 2700,
  lastUpdatedAt: new Date().toISOString(),
  lastExpenses: [
    {
      id: "expense-1",
      label: "Racao e alimentacao",
      amount: 4200,
      date: "2026-02-28",
    },
    {
      id: "expense-2",
      label: "Veterinario e exames",
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
