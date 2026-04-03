import "server-only";

import type { User } from "@supabase/supabase-js";

import { getAdminEmailsFromEnv } from "@/backend/shared/env";

function userRoleFromMetadata(user: User) {
  const appRole = user.app_metadata?.role;
  if (typeof appRole === "string") return appRole.toLowerCase();

  const userRole = user.user_metadata?.role;
  if (typeof userRole === "string") return userRole.toLowerCase();

  return null;
}

export function isAdminUser(user: User | null) {
  if (!user) return false;

  const role = userRoleFromMetadata(user);
  if (role === "admin") return true;

  const adminsByEmail = getAdminEmailsFromEnv();
  if (!adminsByEmail.length) return false;

  const email = user.email?.toLowerCase();
  if (!email) return false;

  return adminsByEmail.includes(email);
}
