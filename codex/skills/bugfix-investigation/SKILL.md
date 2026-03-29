---
name: bugfix-investigation
description: Investigate and fix broken or inconsistent behavior in this repository with a hypothesis-first workflow, bounded scope, and explicit validation. Use when Codex needs to diagnose a bug, trace data flow, isolate the root cause, and apply a targeted fix.
---

# Bugfix Investigation

Investigate a bug before editing.

## Execute

1. Start with `repo-bootstrap` if repository context is not already loaded.
2. Reproduce the issue from the available artifacts or code path.
3. Trace the data flow through route, service, hook, and component boundaries as needed.
4. Form a root-cause hypothesis before changing code.
5. Apply the smallest fix that addresses the root cause.
6. Add or run the best available regression validation.

## Output

- Root cause
- Targeted fix
- Validation and remaining uncertainty
