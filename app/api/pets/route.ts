import { NextRequest, NextResponse } from "next/server";

import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { createPet } from "@/backend/modules/pets/application/create-pet";
import { listPets } from "@/backend/modules/pets/application/list-pets";
import type { PetAgeGroup, PetSize, PetSpecies } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const species = searchParams.get("species") as PetSpecies | null;
  const size = searchParams.get("size") as PetSize | null;
  const ageGroup = searchParams.get("ageGroup") as PetAgeGroup | null;
  const city = searchParams.get("city") ?? null;
  const urgentOnly = searchParams.get("urgentOnly") === "1";
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 24);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const response = await listPets({
    species: species ?? undefined,
    size: size ?? undefined,
    ageGroup: ageGroup ?? undefined,
    city: city ?? undefined,
    urgentOnly,
    limit,
    page,
    sort: searchParams.get("sort"),
  });

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pet = await createPet(body);
    return NextResponse.json(pet, { status: 201 });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
