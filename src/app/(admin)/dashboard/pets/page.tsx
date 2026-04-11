import { DashboardPetsContent } from "@/features/dashboard/pets/components/DashboardPetsContent";

type DashboardPetsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardPetsPage({
  searchParams,
}: DashboardPetsPageProps) {
  const resolvedSearchParams = await searchParams;
  return <DashboardPetsContent searchParams={resolvedSearchParams} />;
}
