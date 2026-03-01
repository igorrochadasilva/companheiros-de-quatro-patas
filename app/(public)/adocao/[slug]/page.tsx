interface AnimalPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AnimalPage({ params }: AnimalPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Detalhe do animal</h1>
      <p className="text-muted-foreground">Slug: {slug}</p>
    </section>
  );
}
