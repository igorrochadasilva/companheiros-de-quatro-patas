import { NextResponse } from "next/server";

import { isAdminUser } from "@/backend/modules/auth/application/is-admin-user";
import { getSupabaseServerClient } from "@/shared/lib/supabase/server";

export async function GET() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { authenticated: false, isAdmin: false, email: null },
      { status: 200 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    isAdmin: isAdminUser(user),
    email: user.email ?? null,
  });
}
