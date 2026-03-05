# Frontend agent rules

- Use sempre a estrutura **feature-based**:
  - `features/<feature>/hooks` para hooks de domínio.
  - `features/<feature>/services` para chamadas de API.
  - `features/<feature>/components` para componentes específicos da feature.
- Componentes de rota ficam em `app/(public|admin)/...` e importam lógica de `features/*`.
- Textos de interface devem vir de `messages/pt-br.json` (ex.: `messages.home`, `messages.adoption`).
- Use `@/shared/ui/*` para componentes de design system (botões, inputs, dialog, etc.).
- Prefira React Server Components; use "use client" apenas quando necessário (estado local, eventos, hooks de navegador).
- Com React Compiler ativo, evite micro-otimizações desnecessárias com `useCallback`/`useMemo` para handlers simples.
- Sempre manter acessibilidade básica: headings corretos, labels claros, `sr-only` para headings de seções lógicas, `aria-label` em botões icônicos e drawers.
