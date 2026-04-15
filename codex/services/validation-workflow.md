# Validation Workflow

Use this workflow after changes are made or when reviewing code.

Stage gates and role checklist:
- `codex/standards/stage-gate-checklist.md`

1. Re-read the affected files for naming, responsibility, and cohesion.
2. Run the cheapest reliable validation for the scope.
3. Check imports, types, route assumptions, and boundary placement.
4. Look for regressions and missing edge-case handling.
5. Summarize what was validated, what was not validated, and any residual risks.

## Dev -> QA Handoff (required for stage completion)

- Stage name
- Scope implemented
- Changed files
- Manual verification steps
- Known risks and expected non-goals

## QA Stage Gate

A stage is approved only when:

1. Functional checks for the affected scope pass.
2. Regression checks for adjacent behavior pass.
3. For UI stages: visual parity is reviewed on desktop and mobile against approved reference.

## Visual QA Evidence (for UI stages)

- Store evidence under `doc/qa/...` (screenshots, notes, diffs when used).
- Report:
  - approved items
  - deviations
  - final recommendation (`approved` or `changes required`)
