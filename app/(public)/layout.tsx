import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-bold text-primary">
            Companheiros de Quatro Patas
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="/adocao" className="hover:text-foreground">
              Adoção
            </Link>
            <Link href="/doar" className="hover:text-foreground">
              Doar
            </Link>
            <Link href="/bazar" className="hover:text-foreground">
              Bazar
            </Link>
            <Link href="/sobre" className="hover:text-foreground">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-foreground">
              Contato
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Companheiros de Quatro Patas
        </div>
      </footer>
    </div>
  );
}
