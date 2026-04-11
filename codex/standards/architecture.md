# Architecture Standard

- Follow the current feature-based architecture documented in `doc/arquitetura/README.md`.
- Treat `src/app/` as the composition layer for pages, layouts, and route handlers.
- Treat `src/features/` as the domain layer for business behavior.
- Treat `src/shared/` as the transversal layer for infrastructure and reusable UI.
- Prefer React Server Components by default.
- Use Client Components only for browser-only state, effects, or interaction.
- Keep API routes typed and presentation-free.
- Keep integration code isolated behind services or shared clients.
- When changing architecture, update `doc/` and `codex/standards/` in the same workstream.
