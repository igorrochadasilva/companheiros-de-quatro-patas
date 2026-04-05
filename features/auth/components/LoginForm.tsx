"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";

import { ADMIN_ROUTES, API_ROUTES, PUBLIC_ROUTES } from "@/constants";
import { authMessages } from "@/messages";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Muted } from "@/shared/ui/typography";

const loginMessages = authMessages.login;

type AuthStatusResponse = {
  authenticated: boolean;
  isAdmin: boolean;
  email: string | null;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(loginMessages.invalidCredentials);
      setLoading(false);
      return;
    }

    const authRes = await fetch(API_ROUTES.auth, { cache: "no-store" });
    const authStatus = (await authRes.json()) as AuthStatusResponse;

    if (!authStatus.isAdmin) {
      await supabase.auth.signOut();
      setError(loginMessages.forbidden);
      setLoading(false);
      return;
    }

    const next = searchParams.get("next");
    if (next?.startsWith("/dashboard")) {
      router.push(next);
    } else {
      router.push(ADMIN_ROUTES.dashboard);
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{loginMessages.emailLabel}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{loginMessages.passwordLabel}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error ? <Muted className="text-destructive">{error}</Muted> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading} className="min-w-28">
          {loading ? loginMessages.submitting : loginMessages.submit}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href={PUBLIC_ROUTES.home}>Home</Link>
        </Button>
      </div>
    </form>
  );
}
