import { NextResponse } from "next/server";

type ContactSubject =
  | "adocao"
  | "doacao"
  | "voluntariado"
  | "lar-temporario"
  | "parceria"
  | "outros";

interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  subject: ContactSubject;
  message: string;
  pet?: string;
  city?: string;
  acknowledgedAdoptionProcess?: boolean;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (!body.name || !body.phone || !body.subject || !body.message) {
    return NextResponse.json(
      { ok: false, error: "missing_required_fields" },
      { status: 400 },
    );
  }

  // Mock inicial: log para observabilidade local.
  // Em producao, trocar por persistencia (DB, fila, e-mail, etc.).
  // eslint-disable-next-line no-console
  console.info("[api/contact]", {
    receivedAt: new Date().toISOString(),
    payload: body,
  });

  return NextResponse.json({ ok: true });
}
