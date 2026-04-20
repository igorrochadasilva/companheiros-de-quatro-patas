import { Typography } from "@/shared/ui/typography";

const CONTACT_BREAK_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5p0X-fBWiBIRPn02cLnNA3nkF3dtIzhNoj8JXTXoujwFRw4n3d0s627UQ3hZT0SVx3b963PGfBtWvbiIaY5BTgrIRsxKuPXN2CQNxtDyQNPmiRkoY2ksksjg57Yhf2CzPyIsamCYSUEvxsWiHcax-cYnLUCd-ppztJzJLdnDWgd-RUgONMk4tRT1fLtJKOoDiDDx7eOtrdseZ8l7hpSse4AZ9ul1rG2g8e7rQpk7FytzfTAAS0XofaKfrbBa_-hQoo-VWiVAZMyY";

export function ContactImageBreakV2() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-12 md:hidden">
      <div className="relative h-48 overflow-hidden rounded-3xl">
        <img
          src={CONTACT_BREAK_IMAGE_URL}
          alt="Caes felizes em um jardim"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#2f2a26]/70 to-transparent p-6">
          <Typography as="p" variant="v2Body" className="italic !text-white">
            Sua ajuda salva vidas diariamente.
          </Typography>
        </div>
      </div>
    </section>
  );
}

