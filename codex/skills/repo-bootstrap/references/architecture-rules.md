# Architecture Rules Reference

- Respect the current feature-based architecture.
- Keep route composition in `app/`.
- Keep business logic in `features/`.
- Keep transversal infrastructure in `shared/`.
- Keep API routes typed and free from presentation logic.
- Do not let one feature import another feature directly.
- Prefer extraction to `shared/` or `types/` when behavior crosses feature boundaries.
