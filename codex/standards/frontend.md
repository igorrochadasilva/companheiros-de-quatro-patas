# Frontend Standard

- Use the feature-based structure:
  - `features/<feature>/hooks` for domain hooks
  - `features/<feature>/services` for API calls
  - `features/<feature>/components` for feature-specific components
- Route components stay in `app/(public|admin)/...` and import logic from `features/*`.
- Interface texts must come from `messages/pt-br.json`.
- Use `@/shared/ui/*` for design-system components.
- Prefer React Server Components by default; use `"use client"` only when needed.
- With React Compiler enabled, avoid unnecessary `useCallback`/`useMemo` micro-optimizations.
- Keep baseline accessibility: correct headings, explicit labels, `sr-only` headings for logical sections, and `aria-label` on icon-only actions.
