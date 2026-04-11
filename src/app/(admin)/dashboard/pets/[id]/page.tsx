import { DashboardPetEditContent } from "@/features/dashboard/pets/components/DashboardPetEditContent";

type DashboardPetEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardPetEditPage({
  params,
}: DashboardPetEditPageProps) {
  const { id } = await params;

  return <DashboardPetEditContent id={id} />;
}
