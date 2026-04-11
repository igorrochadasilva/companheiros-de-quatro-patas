import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    // Valor inicial em callback para satisfazer react-hooks/set-state-in-effect
    const raf = requestAnimationFrame(() => onChange());
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}
