"use client";

import { useRouter } from "next/navigation";

import { PUBLIC_ROUTES } from "@/constants";
import { dashboardMessages } from "@/messages";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/button";

export function DashboardLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push(PUBLIC_ROUTES.login);
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      {dashboardMessages.header.logout}
    </Button>
  );
}
