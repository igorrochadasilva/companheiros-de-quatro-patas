import { NextResponse } from "next/server";

import { isAdminUser } from "@/backend/modules/auth/application/is-admin-user";
import { getSupabaseServerClient } from "@/shared/lib/supabase/server";

export async function requireAdminApi() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminUser(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
