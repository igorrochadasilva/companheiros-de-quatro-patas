# Coding Standard

- Use English for code identifiers, folders, files, components, hooks, services, and types.
- Use `kebab-case` for folders and non-component files.
- Use `PascalCase` for React components and component files.
- Use `camelCase` for variables, functions, and object properties.
- Prefix hooks with `use`.
- Use descriptive names and small functions with one clear responsibility.
- Prefer early returns to reduce nesting.
- Avoid duplication until a real shared pattern appears.
- Keep business rules out of UI components.
- Validate external input near the boundary.
- Avoid hardcoded strings, numbers, and route fragments when a shared source already exists.
- Keep route composition in `src/app/`, domain logic in `src/features/`, shared infrastructure in `src/shared/`, and Codex operational files in `codex/`.
- Do not let one feature import another feature directly.
