import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Item do bazar",
  robots: {
    index: false,
    follow: false,
  },
};

interface BazarItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BazarItemPage({ params }: BazarItemPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Detalhe do item do bazar</h1>
      <p className="text-muted-foreground">Slug: {slug}</p>
    </section>
  );
}
