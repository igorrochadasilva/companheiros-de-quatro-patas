import type { Metadata } from "next";

import { PUBLIC_ROUTES } from "@/constants";

export const metadata: Metadata = {
  title: "Transparência",
  description: "Acompanhe informações institucionais e prestação de contas.",
  alternates: {
    canonical: PUBLIC_ROUTES.transparency,
  },
};

export default function TransparenciaPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Transparência</h1>
      <p className="text-muted-foreground">
        Informações institucionais e prestação de contas.
      </p>
    </section>
  );
}
