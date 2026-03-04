import { HomeHero } from "./_components/HomeHero";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div id="animais" className="scroll-mt-24" aria-hidden />
      <div id="doar" className="scroll-mt-24" aria-hidden />
    </>
  );
}
