function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function requireEnv(name: string) {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`[env] Missing required env var: ${name}`);
  }
  return value;
}

export function requireAnyEnv(...names: string[]) {
  for (const name of names) {
    const value = readEnv(name);
    if (value) return value;
  }

  throw new Error(
    `[env] Missing required env var. Provide one of: ${names.join(", ")}`,
  );
}

export function getSupabasePublicKey() {
  return requireAnyEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  );
}
