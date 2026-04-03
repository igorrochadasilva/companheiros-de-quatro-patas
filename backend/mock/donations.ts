import type { DonationConfig } from "@/types";

export const donationConfigMock: DonationConfig = {
  pixKey: "pix@companheiros4patas.org",
  pixQrUrl: "https://placehold.co/320x320?text=PIX+QR",
  whatsapp: "5511999999999",
  recurringUrl: "https://apoia.se/companheiros4patas",
  bankAccount: "Banco Exemplo - Ag 0001 - Cc 12345-6",
  tiers: [
    {
      id: "tier-25",
      amount: 25,
      label: "R$ 25",
      description: "Ajuda com racao por alguns dias.",
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
