# Debugging Workflow

1. Establish the expected behavior.
2. Compare it with the current code path.
3. Check boundaries first: route params, API payloads, service return shapes, hook state, rendering conditions.
4. Prefer root-cause fixes over defensive patches in multiple layers.
5. Validate the corrected path and nearby edge cases.
