import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-r border-border bg-card p-4">
          <h1 className="mb-4 text-lg font-bold text-primary">Admin ONG</h1>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/admin" className="rounded px-2 py-1 hover:bg-muted">
              Dashboard
            </Link>
            <Link
              href="/admin/animais"
              className="rounded px-2 py-1 hover:bg-muted"
            >
              Animais
            </Link>
            <Link
              href="/admin/adocoes"
              className="rounded px-2 py-1 hover:bg-muted"
            >
              Adoções
            </Link>
            <Link
              href="/admin/doacoes"
              className="rounded px-2 py-1 hover:bg-muted"
            >
              Doações
            </Link>
            <Link
              href="/admin/bazar/produtos"
              className="rounded px-2 py-1 hover:bg-muted"
            >
              Bazar
            </Link>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-border bg-card px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Painel administrativo
            </p>
          </header>
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
