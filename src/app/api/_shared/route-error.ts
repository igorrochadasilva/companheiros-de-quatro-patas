import { NextResponse } from "next/server";
import { ZodError } from "zod";

type PrismaLikeKnownError = Error & {
  code?: string;
  clientVersion?: string;
};

function isPrismaKnownError(error: unknown): error is PrismaLikeKnownError {
  if (!error || typeof error !== "object") return false;

  const maybeError = error as PrismaLikeKnownError;
  return (
    typeof maybeError.code === "string" &&
    maybeError.code.startsWith("P") &&
    typeof maybeError.clientVersion === "string"
  );
}

export function buildErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Invalid payload",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  if (isPrismaKnownError(error)) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 },
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Unique constraint violation" },
        { status: 409 },
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Referenced record does not exist" },
        { status: 409 },
      );
    }
  }

  const message =
    error instanceof Error ? error.message : "Unknown server error";

  return NextResponse.json({ error: message }, { status: 500 });
}
