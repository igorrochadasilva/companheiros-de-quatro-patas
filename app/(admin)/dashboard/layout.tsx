import { redirect } from "next/navigation";

import { isAdminUser } from "@/backend/modules/auth/application/is-admin-user";
import { PUBLIC_ROUTES } from "@/constants";
import { DashboardShell } from "@/features/dashboard/shell/components/DashboardShell";
import { getSupabaseServerClient } from "@/shared/lib/supabase/server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminUser(user)) {
    redirect(`${PUBLIC_ROUTES.login}?next=%2Fdashboard`);
  }

  return <DashboardShell>{children}</DashboardShell>;
}
