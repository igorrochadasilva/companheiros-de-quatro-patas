import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulário de adoção",
  robots: {
    index: false,
    follow: false,
  },
};

interface CandidatarPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CandidatarPage({ params }: CandidatarPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Formulário de adoção</h1>
      <p className="text-muted-foreground">Candidatura para o animal: {slug}</p>
    </section>
  );
}
