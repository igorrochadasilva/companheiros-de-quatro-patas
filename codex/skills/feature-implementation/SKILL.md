---
name: feature-implementation
description: Plan and implement a scoped feature or enhancement in this repository while respecting the existing feature-based architecture, project standards, and validation flow. Use when Codex needs to add or extend behavior after the repository context has been loaded.
---

# Feature Implementation

Implement a scoped feature after repository context is loaded.

## Execute

1. Start with `repo-bootstrap` if repository context is not already loaded.
2. Identify the owning layer and feature.
3. Reuse the nearest existing pattern before introducing a new one.
4. Keep route composition in `app/` and business logic in `features/`.
5. Update contracts, messages, or shared utilities only when the scope requires it.
6. Validate the result with the smallest reliable checks.

## Output

- Change plan
- Implementation
- Validation summary
