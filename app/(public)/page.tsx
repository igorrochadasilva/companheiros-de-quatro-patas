import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Encontre um novo companheiro
      </h1>
      <p className="text-muted-foreground">
        Home inicial com destaque para adoção, doações e apoio ao bazar da ONG.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/adocao"
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground"
        >
          Ver animais
        </Link>
        <Link
          href="/doar"
          className="rounded-lg bg-secondary px-4 py-2 font-semibold text-secondary-foreground"
        >
          Fazer doação
        </Link>
      </div>
    </section>
  );
}
