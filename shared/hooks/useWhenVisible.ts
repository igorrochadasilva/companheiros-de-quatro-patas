"use client";

import { useEffect, useRef, useState } from "react";

export interface UseWhenVisibleOptions {
  /** Margem em px para considerar "visível" antes de entrar no viewport (ex.: 200 = carrega 200px antes) */
  rootMargin?: string;
  /** 0 a 1; quanto do elemento precisa estar visível (ex.: 0.1 = 10%) */
  threshold?: number;
  /** Se true, uma vez visível fica true (não desmonta ao rolar para cima) */
  once?: boolean;
}

const defaultOptions: UseWhenVisibleOptions = {
  rootMargin: "100px",
  threshold: 0,
  once: true,
};

export function useWhenVisible<T extends HTMLElement = HTMLElement>(
  options: UseWhenVisibleOptions = {},
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const { rootMargin, threshold, once } = { ...defaultOptions, ...options };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setHasBeenVisible((prev) => (once ? true : prev || true));
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, hasBeenVisible];
}
