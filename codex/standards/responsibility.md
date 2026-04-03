# Responsibility Separation Standard

- Each React component should have one clear responsibility.
- Data logic (fetching, React Query, transformations) belongs in hooks/services, not pure UI components.
- Page components should orchestrate sections and flows, not host complex business logic.
- Keep separation by file; avoid large files that mix many concerns.
- Before adding a new feature, define which domain owns it and place code in that feature.
- Preserve separation when touching existing code; do not mix unrelated domains.
