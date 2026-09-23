import Link from "next/link";

type Proof = { text: string; slug: string };

const PRINCIPLES: { n: string; title: string; body: string; proof: Proof[] }[] = [
  {
    n: "01",
    title: "Systems that operate themselves",
    body: "I'd rather spend a week making a pipeline self-healing than answer the same 2 AM page twice. Auto-remediation, retries with backoff, and runbook-aware agents beat heroics.",
    proof: [
      { text: "Pipeline Guardian: 18 failure patterns, 5 fixed unattended, the rest ask by email first", slug: "pipeline-guardian" },
      { text: "Async ETL Platform: health watch with auto-rerun", slug: "local-pipeline" },
    ],
  },
  {
    n: "02",
    title: "Validate counts as a first-class signal",
    body: "The worst bugs don't error. They silently return fewer rows. I treat row-count reconciliation and data-quality checks as core features, not afterthoughts.",
    proof: [
      { text: "Async ETL Platform: shadow walker with a drift audit; a refresh that refuses to truncate on zero rows", slug: "local-pipeline" },
      { text: "Cross-Source Date Validator: daily reconciliation with confidence scores", slug: "date-validator" },
    ],
  },
  {
    n: "03",
    title: "Only count it learned once it ships",
    body: "I keep a structured roadmap, but a course isn't done until the idea lands in a production system: evals, safety rails, and observability included.",
    proof: [
      { text: "Workforce platform: 143 test files; late filings 44% → 7% in the first month", slug: "workforce-compliance-platform" },
      { text: "DARA: row-level security, and 177 SQL-guard cases in the public reference build", slug: "data-analyst-reporting-agent" },
    ],
  },
];

/**
 * "How I work" — the principles a resume bullet can't hold. Relocated to the
 * home page from the retired /resume page; the PDF résumé now serves that role.
 */
export function Principles() {
  return (
    <section className="band" id="approach" data-tab="about" data-screen-label="How I work">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">How I work</div>
          <h2>Three things I optimize for.</h2>
        </div>
        <div className="approach-list">
          {PRINCIPLES.map((p) => (
            <div className="approach-row" key={p.n}>
              <span className="ap-n">{p.n}</span>
              <div className="ap-body">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul className="ap-proof">
                  {p.proof.map((pr) => (
                    <li key={pr.slug + pr.text}>
                      <Link href={`/projects/${pr.slug}`}>{pr.text} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
