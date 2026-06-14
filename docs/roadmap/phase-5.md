# Phase 5 — Optional depth

Elective tracks to go deeper on agent frameworks, ML engineering rigour, or LLM internals. Pick the tracks relevant to where you want to specialise.

## <a id="hf-agents"></a>HF Agents Course  `SUPPORT`

**Learn:** agent frameworks breadth (track-dependent — smolagents, LlamaIndex, LangGraph, etc.).
**Measure:** complete one depth track with a working agent demo artifact.
**Data:** a sandbox dataset or a DARA subset.
**Ships:** demo repo (or branch) published and linked as the artifact URL.
**Build steps:** ① pick one Hugging Face Agents course track → ② work through the units and complete the exercises → ③ build the track's demo agent using your sandbox/DARA data → ④ test the demo end-to-end → ⑤ publish the repo and link it on the dashboard.

## <a id="mlops"></a>MLOps fundamentals  `SUPPORT`

**Learn:** production-ML rigor: testing, CI/CD for ML, monitoring.
**Measure:** apply one MLOps practice to an existing pipeline (e.g., a data-validation gate in CI).
**Data:** ETL/Report Automation CI.
**Ships:** CI gate PR (e.g., a data-validation step that fails on bad data).
**Build steps:** ① pick one MLOps practice to apply (data validation, model testing, drift monitoring) → ② add it to the ETL or Report Automation CI pipeline → ③ make it fail on intentionally bad data to confirm it catches issues → ④ verify it passes on good data → ⑤ open PR with the CI gate.

## <a id="hf-llm"></a>HF LLM Course  `SUPPORT`

**Learn:** transformer internals; tokenization; attention; fine-tuning basics.
**Measure:** a written explainer connecting one internal concept to an observed DARA behavior.
**Data:** DARA behavior logs.
**Ships:** an explainer note committed to the repo.
**Build steps:** ① study one Hugging Face LLM course chapter (e.g., attention mechanisms) → ② search DARA behavior logs for a matching observable behavior (e.g., attention-related context truncation, tokenization surprises) → ③ write the explainer: describe the internal mechanism and show how it explains the observed behavior → ④ review for accuracy against the course material → ⑤ commit the explainer note.

## <a id="managed-agents"></a>Managed Agents API  `SUPPORT`

Moved here from Phase 0 — it's out of the CCA-F blueprint (CCA-F is about *building* your own orchestration, not the hosted product), but still useful depth once the core is solid.

**Learn:** server-managed agents vs the self-hosted loop; sessions; rubric-graded outcomes; tradeoffs.
**Measure:** a design sketch of DARA as a Managed Agent with one rubric-graded outcome (explicit pass/fail).
**Data:** DARA's current agent definition + one representative task.
**Ships:** a design note in the playbook.
**Build steps:** ① read the Managed Agents docs → ② map DARA's current loop onto the managed model → ③ define one rubric-graded outcome → ④ note the tradeoffs vs self-hosting → ⑤ commit the note.
