# Phase 1 — Master your existing stack

Deepen engineering rigour on the systems already in production: build a proper eval harness so every DARA/Guardian change has a measurable before/after signal.

## <a id="week-2"></a>Week 2 — Anthropic courses (prompting + evals)  `BUILD`

**Learn:** eval harness design; graded test sets; classification vs model-graded evals; measuring prompt changes.
**Measure:** eval harness over 1 decision with ≥10 graded cases producing a pass-rate; a prompt change moves the pass-rate.
**Data:** real DARA query/answer pairs (or Pipeline Guardian remediation decisions).
**Ships:** eval harness + baseline pass-rate report.
**Build steps:** ① collect ≥10 cases with expected answers (DARA QA pairs or Guardian decisions) → ② build a grader (classification or model-graded) that scores each case → ③ run the baseline and record the pass-rate → ④ make a prompt change and re-run → ⑤ publish the before/after delta as the harness output.
