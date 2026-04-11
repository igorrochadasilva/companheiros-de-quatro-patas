# Architecture Rules Reference

- Respect the current feature-based architecture.
- Keep route composition in `src/app/`.
- Keep business logic in `src/features/`.
- Keep transversal infrastructure in `src/shared/`.
- Keep API routes typed and free from presentation logic.
- Do not let one feature import another feature directly.
- Prefer extraction to `shared/` or `types/` when behavior crosses feature boundaries.
