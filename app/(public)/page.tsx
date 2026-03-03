import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { H1, Lead } from "@/shared/ui/typography";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <H1>Encontre um novo companheiro</H1>
      <Lead>
        Home inicial com destaque para adoção, doações e apoio ao bazar da ONG.
      </Lead>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="primary" size="lg">
          <Link href="/adocao">Ver animais</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="/doar">Fazer doação</Link>
        </Button>
      </div>
    </section>
  );
}
