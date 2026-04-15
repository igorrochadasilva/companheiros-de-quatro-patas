import type { ReactNode } from "react";

type LayoutV2ShellProps = {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

/**
 * Internal v2 shell. It is intentionally isolated from current public layout
 * so we can roll out header/footer/home in phases without regressions.
 */
export function LayoutV2Shell({ header, children, footer }: LayoutV2ShellProps) {
  return (
    <div className="layout-v2 min-h-screen">
      <header>{header}</header>
      <main className="v2-main-offset">{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

