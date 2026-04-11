import { NextResponse } from "next/server";

import { PET_IMPORT_TEMPLATE_HEADERS } from "@/backend/modules/pets/utils/pet-import";

const EXAMPLE_ROW = [
  "pet-001",
  "Luna",
  "DOG",
  "SRD",
  "2",
  "MEDIUM",
  "FEMALE",
  "Caramelo",
  "true",
  "true",
  "Docil e sociavel",
  "AVAILABLE",
  "Sao Paulo",
  "SP",
  "false",
  "true",
];

export async function GET() {
  const csv = [
    PET_IMPORT_TEMPLATE_HEADERS.join(","),
    EXAMPLE_ROW.join(","),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pets-import-template.csv"',
      "Cache-Control": "no-store",
    },
  });
}
