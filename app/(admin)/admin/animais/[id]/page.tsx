interface AdminAnimalDetalhePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminAnimalDetalhePage({
  params,
}: AdminAnimalDetalhePageProps) {
  const { id } = await params;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Detalhe do animal</h1>
      <p className="text-muted-foreground">ID: {id}</p>
    </section>
  );
}
