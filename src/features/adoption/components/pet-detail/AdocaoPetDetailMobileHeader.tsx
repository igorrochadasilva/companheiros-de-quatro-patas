import { adoptionMessages } from "@/messages";
import { Typography } from "@/shared/ui/typography";

type AdocaoPetDetailMobileHeaderProps = {
  name: string;
  breed: string | null;
  age: string | null;
  sizeLabel: string;
};

export function AdocaoPetDetailMobileHeader({
  name,
  breed,
  age,
  sizeLabel,
}: AdocaoPetDetailMobileHeaderProps) {
  return (
    <header className="mb-5 md:hidden">
      <Typography as="h1" variant="v2H1" className="!text-6xl">
        {name}
      </Typography>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {breed ? (
          <span className="rounded-full bg-[var(--v2-primary)]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[var(--v2-on-primary-container)]">
            {breed}
          </span>
        ) : null}
        <Typography as="p" variant="v2Muted" className="!text-sm">
          {age ?? adoptionMessages.v2.grid.ageUnknown} -{" "}
          {adoptionMessages.petDetail.sizePrefix} {sizeLabel}
        </Typography>
      </div>
    </header>
  );
}
