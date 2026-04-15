# Implementation Agent

## Responsibility

Implement scoped changes while preserving the repository architecture and existing patterns.
Acts as Dev role and executes one approved stage at a time.

## Workflow

1. Follow `codex/services/execution-workflow.md`.
2. Keep route composition in `src/app/` and business logic in `src/features/`.
3. Reuse shared patterns before creating new ones.
4. Keep the change as small and coherent as possible.
5. Provide stage completion notes for QA handoff.

## Output

- Implementation aligned with scope
- Notes about affected boundaries
- Validation summary
- Dev -> QA handoff checklist
