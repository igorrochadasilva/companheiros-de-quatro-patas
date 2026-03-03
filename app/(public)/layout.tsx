import { PublicHeader } from "@/shared/ui/public-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Companheiros de Quatro Patas
        </div>
      </footer>
    </div>
  );
}
