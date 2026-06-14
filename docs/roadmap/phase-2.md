# Phase 2 — LLM systems engineering

Go beyond individual calls: build retrieval, observability, and a systematic understanding of agent frameworks to make DARA production-grade.

## <a id="week-3"></a>Week 3 — Advanced RAG  `BUILD`

**Learn:** retrieval over structured/unstructured data; chunking; embeddings; RAG eval (faithfulness/relevance).
**Measure:** RAG over analytics views answers 5 business questions with citations; retrieval relevance measured.
**Data:** the analytics-schema views (table/column descriptions, metric definitions).
**Ships:** RAG prototype wired into DARA + a 5-question eval with retrieval-relevance scores.
**Build steps:** ① index the analytics-schema view docs (chunk by table/column, embed) → ② build a retrieval layer that returns relevant chunks for an NL question → ③ wire retrieval into DARA so answers cite the retrieved schema → ④ test 5 representative business questions and record citations → ⑤ measure retrieval relevance (e.g., NDCG or manual grading) and commit the eval output.

## <a id="week-4"></a>Week 4 — Evaluating AI Agents / observability  `BUILD`

**Learn:** agent traces & spans; what to log (tool calls, tokens, latency, decisions); offline vs online eval.
**Measure:** traces added so every DARA/Guardian run emits a structured trace answering "why did run X decide Y".
**Data:** DARA/Pipeline Guardian run logs.
**Ships:** tracing PR + a walkthrough of 1 real trace showing a decision chain.
**Build steps:** ① define a trace schema (run_id, tool_calls[], decision, token_counts, latency_ms) → ② instrument DARA and Guardian: emit a span per tool call and a decision record per run → ③ ensure every run writes a structured trace to a log sink → ④ replay one real run and walk through its trace to confirm "why did run X decide Y" is answerable → ⑤ open PR with instrumentation + trace walkthrough doc.

## <a id="week-5"></a>Week 5 — Functions/Tools/Agents (LangChain)  `HARDEN`

**Learn:** LCEL composition; tool abstraction; LangChain's agent model vs hand-rolled; what to borrow/skip.
**Measure:** a written comparison identifying ≥2 concrete improvements (adopted or rejected with reason).
**Data:** DARA/Pipeline Guardian tool definitions.
**Ships:** a comparison note committed to the repo.
**Build steps:** ① skim LCEL docs and the LangChain agent model → ② map DARA's and Guardian's existing tool definitions to the LangChain abstraction → ③ identify ≥2 concrete improvements (e.g., structured tool schemas, LCEL retry logic) → ④ decide adopt or reject for each, with explicit reasoning → ⑤ commit the comparison note (improvements table + decisions).
