import { NextResponse } from "next/server";

import type { Story } from "@/types";

const stories: Story[] = [
  {
    id: "story-1",
    title: "Da rua para o sofá: a história da Mel",
    summary:
      "Resgatada desnutrida, hoje a Mel vive cercada de carinho em seu novo lar.",
    imageUrl: "https://placehold.co/600x400?text=Mel",
  },
  {
    id: "story-2",
    title: "Um novo começo para o Thor",
    summary:
      "Após meses em tratamento, o Thor encontrou uma família ativa como ele.",
    imageUrl: "https://placehold.co/600x400?text=Thor",
  },
  {
    id: "story-3",
    title: "Quando dois gatinhos escolhem a mesma família",
    summary:
      "Nina e Chico chegaram tímidos, mas nunca mais se separaram — nem dos tutores.",
    imageUrl: "https://placehold.co/600x400?text=Nina+%26+Chico",
  },
];

export async function GET() {
  return NextResponse.json({ items: stories });
}
