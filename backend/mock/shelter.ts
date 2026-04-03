import type { ShelterProgress } from "@/types";

export const shelterProgressMock: ShelterProgress = {
  percentComplete: 58,
  goalAmount: 240000,
  raisedAmount: 138000,
  spentAmount: 116500,
  remainingAmount: 102000,
  lastUpdated: "2026-03-05T14:30:00.000Z",
  milestones: [
    {
      id: "foundation",
      title: "Fundacao e drenagem",
      description: "Preparacao do terreno, base estrutural e drenagem.",
      weight: 20,
      status: "done",
      costPlanned: 40000,
      costSpent: 39500,
      updatedAt: "2025-12-18T09:00:00.000Z",
    },
    {
      id: "structure",
      title: "Estrutura e alvenaria",
      description: "Levantamento das paredes e cobertura das baias.",
      weight: 30,
      status: "done",
      costPlanned: 70000,
      costSpent: 68500,
      updatedAt: "2026-01-20T11:00:00.000Z",
    },
    {
      id: "electrical",
      title: "Instalacoes eletricas e hidraulicas",
      description: "Rede eletrica principal, pontos de agua e esgoto.",
      weight: 20,
      status: "in_progress",
      costPlanned: 52000,
      costSpent: 29500,
      updatedAt: "2026-03-03T15:20:00.000Z",
    },
    {
      id: "finishing",
      title: "Acabamento e seguranca",
      description: "Pisos, pintura lavavel, telas e portoes.",
      weight: 20,
      status: "pending",
      costPlanned: 50000,
      costSpent: 0,
    },
    {
      id: "equipment",
      title: "Equipamentos e ambientacao",
      description: "Canis, gatil, area clinica e mobiliario de apoio.",
      weight: 10,
      status: "pending",
      costPlanned: 28000,
      costSpent: 0,
    },
  ],
  updates: [
    {
      id: "u1",
      title: "Cobertura finalizada",
      date: "2026-02-15T10:00:00.000Z",
      text: "Concluimos a instalacao da cobertura principal das baias.",
      images: [
        {
          url: "https://placehold.co/1200x800.png?text=Cobertura+finalizada",
          alt: "Equipe finalizando a cobertura do abrigo",
        },
      ],
    },
    {
      id: "u2",
      title: "Inicio das instalacoes",
      date: "2026-03-01T13:00:00.000Z",
      text: "Comecamos a fase de instalacoes eletricas e hidraulicas.",
      images: [
        {
          url: "https://placehold.co/1200x800.png?text=Instalacoes",
          alt: "Tubulacoes da obra do abrigo",
        },
        {
          url: "https://placehold.co/1200x800.png?text=Eletrica",
          alt: "Quadro eletrico em instalacao",
        },
      ],
    },
    {
      id: "u3",
      title: "Primeira area interna pronta",
      date: "2026-03-05T16:40:00.000Z",
      text: "Uma ala interna ja esta pronta para receber acabamento final.",
      images: [
        {
          url: "https://placehold.co/1200x800.png?text=Area+interna",
          alt: "Area interna do abrigo em fase de acabamento",
        },
      ],
    },
  ],
  donation: {
    pixKey: "pix@companheiros4patas.org",
    pixQrUrl: "https://placehold.co/320x320.png?text=PIX+ABRIGO",
    whatsapp: "5511999999999",
  },
};
