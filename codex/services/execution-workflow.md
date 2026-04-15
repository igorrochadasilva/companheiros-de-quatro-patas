# Execution Workflow

Use this workflow before editing code.

Stage gates and role checklist:
- `codex/standards/stage-gate-checklist.md`

1. Read `README.md` for repository and product context.
2. Read the relevant files in `codex/standards/`.
3. Read `doc/arquitetura/README.md` when the task affects structure, flow, or module boundaries.
4. Inspect the target feature, route, or shared module.
5. Choose the correct skill:
   - `codex/skills/repo-bootstrap` for broad or ambiguous tasks
   - `codex/skills/feature-implementation` for scoped implementation
   - `codex/skills/bugfix-investigation` for broken behavior
   - `codex/skills/code-review` for review and risk analysis
6. Confirm the goal, expected outcome, and target paths before editing.
7. Reuse existing patterns before introducing new ones.
8. Decide whether the task needs a plan, clarification, or direct execution.
9. List likely validation steps before making changes.

## PM -> Dev Handoff (required for substantial tasks)

- Goal and scope boundaries
- In-scope vs out-of-scope
- Target files or modules
- Stage acceptance criteria
- Known constraints and risks

## Dev Stage Rules

- Implement only the current approved stage.
- Keep changes scoped and coherent to existing architecture.
- Produce a concise implementation note after each stage:
  - changed files
  - key behavior changes
  - validation executed
  - residual risks
