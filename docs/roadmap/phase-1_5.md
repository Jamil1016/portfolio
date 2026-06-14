# Phase 1.5 — AI Security

Apply adversarial thinking to the systems in production: find real weaknesses in DARA and Pipeline Guardian, document them, and mitigate the worst ones.

## <a id="week-2-5a"></a>Week 2.5a — Gandalf (prompt injection)  `BUILD`

**Learn:** prompt-injection tactics: instruction override, encoding, role-play, indirect; which defenses block which.
**Measure:** beat ≥ Gandalf Level 5; documented tactics→defense map applied to DARA's prompt boundary.
**Data:** Gandalf levels (external) applied to DARA's prompt boundary.
**Ships:** a playbook note mapping tactics to defenses with DARA-specific verdicts.
**Build steps:** ① play Gandalf to Level 5+ and log which techniques succeeded at each level → ② document the tactics that worked (instruction override, encoding, role-play, indirect) → ③ map each tactic to a concrete DARA prompt-boundary defense → ④ note any gaps where DARA is not currently defended → ⑤ commit the tactics→defense map note.

## <a id="week-2-5b"></a>Week 2.5b — OWASP LLM Top 10  `BUILD`

**Learn:** OWASP LLM Top 10 risks; mapping each risk to a real system.
**Measure:** all 10 risks mapped to your systems with covered/not-covered verdicts; ≥1 gap filed as a DARA ticket.
**Data:** DARA + Pipeline Guardian architecture.
**Ships:** risk table + at least 1 filed DARA ticket for the worst uncovered gap.
**Build steps:** ① list the OWASP LLM Top 10 → ② for each risk, assess DARA and Pipeline Guardian (covered / partially covered / not covered) → ③ identify the worst uncovered gap → ④ file a DARA ticket for that gap → ⑤ commit the completed risk table.

## <a id="week-2-5c"></a>Week 2.5c — Red Teaming LLM Apps  `BUILD`

**Learn:** systematic red-team techniques; building adversarial cases; measuring robustness.
**Measure:** 1 red-team technique applied to DARA prompt construction with a documented result + mitigation.
**Data:** DARA prompt construction path.
**Ships:** result note documenting what happened + mitigation PR (if a breach was found).
**Build steps:** ① pick one red-team technique (e.g., jailbreak via hypothetical framing) → ② craft ≥3 adversarial cases targeting DARA's prompt construction → ③ run them against DARA and record outcomes → ④ if any breach found, implement a mitigation → ⑤ document the technique, result, and mitigation in a committed note.

## <a id="week-2-5d"></a>Week 2.5d — OWASP Web Top 10 (SQL injection focus)  `BUILD`

**Learn:** SQLi vectors; auth bypass; how NL→SQL can emit unsafe SQL; parameterization/allowlisting.
**Measure:** DARA NL→SQL path verified against ≥5 malicious prompts — all blocked or read-only/schema-scoped.
**Data:** DARA NL→SQL generation + DB role/permissions.
**Ships:** SQLi test set + guardrail PR enforcing read-only + schema scope.
**Build steps:** ① write ≥5 malicious natural-language prompts designed to elicit unsafe SQL → ② run each against DARA's NL→SQL path and record the emitted SQL → ③ enforce read-only DB role + schema-scoped allowlist on the generated SQL → ④ re-run all 5 prompts and confirm all are blocked or scoped → ⑤ open PR with the test set + guardrail changes.

## <a id="week-2-5e"></a>Week 2.5e — Anthropic safety / RSP  `SUPPORT`

**Learn:** responsible scaling concepts; safety controls for autonomous agents.
**Measure:** a note listing which RSP-style controls Pipeline Guardian has vs lacks.
**Data:** Pipeline Guardian's autonomy scope.
**Ships:** a committed controls note (covered / not covered per control).
**Build steps:** ① read Anthropic's RSP and extract the key safety-control categories → ② list Guardian's autonomy scope (what decisions it makes without human approval) → ③ check each RSP control against Guardian's current implementation → ④ note gaps explicitly → ⑤ commit the controls note.
