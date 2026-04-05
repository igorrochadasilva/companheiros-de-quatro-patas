import messages from "@/messages/pt-br.json";
import { Spinner } from "@/shared/ui/spinner";
import { Muted, Small } from "@/shared/ui/typography";

const loadingMessages = messages.dashboard.loading;

export function DashboardRouteLoading() {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-xl border bg-card/80 p-6">
      <Spinner className="size-5" />
      <Small>{loadingMessages.title}</Small>
      <Muted>{loadingMessages.subtitle}</Muted>
    </section>
  );
}
