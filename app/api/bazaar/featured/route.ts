import { NextResponse } from "next/server";

import { type BazaarItem, BazaarItemStatusEnum } from "@/types";

const now = new Date().toISOString();

const items: BazaarItem[] = [
  {
    id: "bazaar-1",
    name: "Camiseta oficial",
    description: "Camiseta de algodao com estampa da ONG.",
    price: 79.9,
    imageUrl: "https://placehold.co/300x300.png?text=Camiseta",
    status: BazaarItemStatusEnum.AVAILABLE,
    category: "Vestuario",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bazaar-2",
    name: "Caneca personalizada",
    description: "Caneca solidaria para apoiar os resgates.",
    price: 49.9,
    imageUrl: "https://placehold.co/300x300.png?text=Caneca",
    status: BazaarItemStatusEnum.RESERVED,
    category: "Utilidades",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bazaar-3",
    name: "Bandana para pets",
    description: "Bandana para caes e gatos em varios tamanhos.",
    price: 29.9,
    imageUrl: "https://placehold.co/300x300.png?text=Bandana",
    status: BazaarItemStatusEnum.AVAILABLE,
    category: "Acessorios",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bazaar-4",
    name: "Ecobag da ONG",
    description: "Ecobag reutilizavel com arte exclusiva.",
    price: 39.9,
    imageUrl: "https://placehold.co/300x300.png?text=Ecobag",
    status: BazaarItemStatusEnum.AVAILABLE,
    category: "Vestuario",
    createdAt: now,
    updatedAt: now,
  },
];

export async function GET() {
  return NextResponse.json({ items });
}
