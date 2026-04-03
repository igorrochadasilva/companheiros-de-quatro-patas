---
name: repo-bootstrap
description: Load repository context and establish the correct execution path before any implementation, refactor, review, or bugfix work in this project. Use when Codex needs the project map, architecture rules, coding rules, folder ownership, or the correct initial workflow before editing files.
---

# Repo Bootstrap

Load repository context before choosing an implementation path.

## Execute

1. Read `README.md`.
2. Read the relevant files in `codex/standards/`.
3. Read `doc/arquitetura/README.md` for architectural placement and boundaries.
4. Read `references/project-map.md`.
5. Read `references/architecture-rules.md` and `references/coding-rules.md`.
6. Read `codex/services/execution-workflow.md`.
7. Identify the target feature, route, or shared module.
8. Hand off to the narrowest execution skill that matches the request.

## Output

- Current goal
- Affected area
- Constraints
- Recommended next skill
