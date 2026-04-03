import messages from "@/messages/pt-br.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Muted } from "@/shared/ui/typography";

import { LoginForm } from "./LoginForm";

const loginMessages = messages.auth.login;

export function LoginContent() {
  return (
    <section className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle>{loginMessages.title}</CardTitle>
          <Muted>{loginMessages.subtitle}</Muted>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
