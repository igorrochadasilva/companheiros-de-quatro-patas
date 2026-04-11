"use client";

import * as React from "react";

import { useWhenVisible } from "@/shared/hooks/useWhenVisible";

export interface LazySectionProps {
  children: React.ReactNode;
  /** Conteúdo exibido antes da seção entrar no viewport (evita layout shift) */
  placeholder?: React.ReactNode;
  /** Margem para disparar antes de ficar visível (ex.: "200px") */
  rootMargin?: string;
  className?: string;
}

/**
 * Monta os filhos só quando a seção entra (ou se aproxima) do viewport.
 * Reduz requisições no carregamento inicial da página.
 */
export function LazySection({
  children,
  placeholder,
  rootMargin = "150px",
  className,
}: LazySectionProps) {
  const [ref, hasBeenVisible] = useWhenVisible<HTMLDivElement>({ rootMargin });

  return (
    <div ref={ref} className={className}>
      {hasBeenVisible
        ? children
        : (placeholder ?? <div className="min-h-[200px]" />)}
    </div>
  );
}
