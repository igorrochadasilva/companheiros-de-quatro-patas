import { redirect } from "next/navigation";

import { isAdminUser } from "@/backend/modules/auth/application/is-admin-user";
import { ADMIN_ROUTES } from "@/constants";
import { LoginContent } from "@/features/auth/components/LoginContent";
import { getSupabaseServerClient } from "@/shared/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminUser(user)) {
    redirect(ADMIN_ROUTES.dashboard);
  }

  return <LoginContent />;
}
