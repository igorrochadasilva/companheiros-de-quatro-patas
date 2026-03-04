import { NextResponse } from "next/server";

import type { Pet } from "@/types";

const mockPets: Pet[] = [
  {
    id: "pet-1",
    name: "Luna",
    species: "dog",
    size: "medium",
    ageYears: 2,
    ageGroup: "adult",
    city: "São Paulo",
    state: "SP",
    imageUrl: "https://placehold.co/400x400?text=Luna",
    descriptionShort: "Dócil, vacinada e castrada. Adora crianças.",
    tags: ["vaccinated", "neutered"],
  },
  {
    id: "pet-2",
    name: "Mingau",
    species: "cat",
    size: "small",
    ageYears: 1,
    ageGroup: "adult",
    city: "Guarulhos",
    state: "SP",
    imageUrl: "https://placehold.co/400x400?text=Mingau",
    descriptionShort: "Gatinho carinhoso, perfeito para apartamento.",
    tags: ["vaccinated"],
  },
];

export async function GET() {
  // Filtro e paginação podem ser acrescentados depois.
  return NextResponse.json({
    items: mockPets,
  });
}
