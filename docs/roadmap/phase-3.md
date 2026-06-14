# Phase 3 — Modern data stack

Add dbt and Airflow to your toolbox by applying them directly to the Report Automation queries and ETL pipelines already in production.

## <a id="week-6"></a>Week 6 — dbt Fundamentals  `SUPPORT`

**Learn:** dbt models, refs, sources, tests, materializations; dbt vs hand-written SQL pipelines.
**Measure:** dbt-postgres running against Supabase with ≥1 model built and a dbt test passing.
**Data:** the analytics schema (read-only).
**Ships:** a dbt skeleton project with ≥1 model + a passing test.
**Build steps:** ① install dbt-postgres and configure a profile pointing at Supabase → ② create a source referencing the analytics schema → ③ build 1 model using `ref()` and a source → ④ add a `not_null` or `unique` schema test → ⑤ run `dbt test` and commit the passing output.

## <a id="week-7"></a>Week 7 — Apply dbt to Report Automation  `SUPPORT`

**Learn:** converting procedural SQL to a dbt model; sources + schema tests; incremental models.
**Measure:** 1 Report Automation query converted to a dbt model with ≥2 tests passing, output reconciling row-for-row.
**Data:** a Report Automation query + its current output.
**Ships:** dbt model PR + row-for-row reconciliation evidence.
**Build steps:** ① pick one Report Automation query to port → ② convert it to a dbt model with proper `source()` and `ref()` references → ③ add ≥2 schema tests (`not_null`, `unique`, or custom) → ④ reconcile the dbt output against the original query row-for-row → ⑤ open PR with the model, tests, and reconciliation diff.

## <a id="week-8"></a>Week 8 — Airflow 101  `SUPPORT`

**Learn:** DAGs, operators, scheduling, retries, backfill; Airflow vs GitHub Actions cron.
**Measure:** pipeline.yml redrawn as an Airflow DAG running locally E2E on sample data with task-level retries.
**Data:** the ETL platform's pipeline.yml + a sample data slice.
**Ships:** DAG file + a local-run log showing E2E success.
**Build steps:** ① map each `pipeline.yml` stage to an Airflow task operator → ② write the DAG file with correct dependencies and scheduling → ③ add task-level retry/backfill configuration → ④ run the DAG locally on a sample data slice and confirm E2E completion → ⑤ capture the run log and commit DAG + log.

## <a id="cert-dbt"></a>dbt Analytics Engineering Certification

This is a certification milestone, not a weekly build project.

**Learn:** dbt Analytics Engineering exam domains: modeling, testing, deployment.
**Measure:** pass the dbt Analytics Engineering certification exam.
**Data:** dbt cert exam guide.
**Ships:** certificate (set the credential link as the item's artifact URL).
**Build steps:** ① work through the official dbt cert study guide → ② build and test practice models in the sandbox → ③ drill weak-area topics (e.g., incremental models, deployment) → ④ book the exam → ⑤ pass and link the credential.
