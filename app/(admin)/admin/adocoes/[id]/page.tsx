interface AdminAdocaoDetalhePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminAdocaoDetalhePage({
  params,
}: AdminAdocaoDetalhePageProps) {
  const { id } = await params;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Detalhe da adoção</h1>
      <p className="text-muted-foreground">ID: {id}</p>
    </section>
  );
}
