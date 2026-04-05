import { AdocaoPetDetailContent } from "@/features/adoption/components/AdocaoPetDetailContent";

type AnimalPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AnimalPage({ params }: AnimalPageProps) {
  const { slug } = await params;

  return <AdocaoPetDetailContent slug={slug} />;
}
