---
name: code-review
description: Review code changes in this repository with focus on bugs, regressions, architectural violations, missing validation, and test gaps. Use when Codex is asked to review, assess risk, or audit a change instead of implementing it directly.
---

# Code Review

Review code with a risk-first mindset.

## Execute

1. Start with `repo-bootstrap` if repository context is not already loaded.
2. Read the changed files and surrounding context.
3. Look for correctness issues before style feedback.
4. Check architectural placement, responsibility boundaries, and validation gaps.
5. Report findings ordered by severity.
6. Mention residual risks when no concrete finding exists.

## Output

- Findings first
- Open questions or assumptions
- Brief change summary only after findings
