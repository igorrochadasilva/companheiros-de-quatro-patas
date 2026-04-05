import messages from "@/messages/pt-br.json";
import { Spinner } from "@/shared/ui/spinner";
import { Small, Typography } from "@/shared/ui/typography";

const loadingMessages = messages.dashboard.loading;

export function DashboardRouteLoading() {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-950/20 via-slate-900/25 to-slate-950/35 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative grid size-14 place-items-center">
          <div className="absolute inset-0 animate-pulse rounded-full border border-white/30 bg-white/10" />
          <Spinner className="relative size-6 text-white" />
        </div>
        <Typography as="p" variant="body" className="font-medium text-white">
          {loadingMessages.title}
        </Typography>
        <Small className="text-white/75">{loadingMessages.subtitle}</Small>
      </div>
    </section>
  );
}
