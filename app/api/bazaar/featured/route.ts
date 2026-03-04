import { NextResponse } from "next/server";

import type { BazaarItem } from "@/types";

const items: BazaarItem[] = [
  {
    id: "bazaar-1",
    name: "Camiseta oficial",
    price: 79.9,
    imageUrl: "https://placehold.co/300x300.png?text=Camiseta",
    category: "Vestuário",
  },
  {
    id: "bazaar-2",
    name: "Caneca personalizada",
    price: 49.9,
    imageUrl: "https://placehold.co/300x300.png?text=Caneca",
    category: "Utilidades",
  },
  {
    id: "bazaar-3",
    name: "Bandana para pets",
    price: 29.9,
    imageUrl: "https://placehold.co/300x300.png?text=Bandana",
    category: "Acessórios",
  },
  {
    id: "bazaar-4",
    name: "Ecobag da ONG",
    price: 39.9,
    imageUrl: "https://placehold.co/300x300.png?text=Ecobag",
    category: "Vestuário",
  },
];

export async function GET() {
  return NextResponse.json({ items });
}
