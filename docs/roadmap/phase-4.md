# Phase 4 — Cloud + GenAI fluency

Understand how your current Supabase/GHA stack maps onto GCP's managed services, and design what DARA would look like running on GCP end-to-end.

## <a id="week-9"></a>Week 9 — GCP GenAI Leader  `SUPPORT`

**Learn:** GCP GenAI service map (Vertex AI, BigQuery, Cloud Run, Pub/Sub); managed vs self-hosted tradeoffs.
**Measure:** a table mapping ≥3 Supabase/GHA components to GCP equivalents with a cost/benefit note each.
**Data:** your current architecture inventory.
**Ships:** a swap-table note committed to the repo.
**Build steps:** ① inventory your current components (Supabase, GitHub Actions, DARA hosting, etc.) → ② find the GCP equivalent for each (Cloud SQL / BigQuery, Cloud Build, Vertex AI, etc.) → ③ write a cost/benefit note for each swap → ④ pick the top 3 most compelling swaps → ⑤ commit the swap table.

## <a id="week-10"></a>Week 10 — Architecture rewrite  `SUPPORT`

**Learn:** cloud architecture diagramming; data flow; failure domains; cost modeling.
**Measure:** a DARA-on-GCP diagram with data flow + one failure-mode annotation per component.
**Data:** DARA's current architecture.
**Ships:** architecture diagram + a rationale doc.
**Build steps:** ① draw DARA's current architecture (components, data flows, hosting) → ② re-draw it on GCP (Cloud Run for DARA, BigQuery for analytics, Vertex AI for LLM, Pub/Sub for events) → ③ annotate one realistic failure mode per component → ④ write a rationale explaining the key design decisions → ⑤ commit diagram + rationale.

## <a id="cert-gcp-pde"></a>GCP Professional Data Engineer Certification  `SUPPORT`

This is a certification milestone, not a weekly build project.

**Learn:** GCP Professional Data Engineer domains: storage, pipelines, ML, security.
**Measure:** pass the GCP Professional Data Engineer exam.
**Data:** official exam guide + practice exams.
**Ships:** certificate (set the credential link as the item's artifact URL).
**Build steps:** ① work through the official GCP PDE exam guide by domain → ② take practice exams and score them → ③ drill weak-area domains (storage options, Dataflow, ML pipelines, IAM) → ④ book the exam → ⑤ pass and link the credential.
