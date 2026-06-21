const PRINCIPLES = [
  {
    n: "01",
    title: "Systems that operate themselves",
    body: "I'd rather spend a week making a pipeline self-healing than answer the same 2 AM page twice. Auto-remediation, retries with backoff, and runbook-aware agents beat heroics.",
  },
  {
    n: "02",
    title: "Validate counts as a first-class signal",
    body: "The worst bugs don't error. They silently return fewer rows. I treat row-count reconciliation and data-quality checks as core features, not afterthoughts.",
  },
  {
    n: "03",
    title: "Only count it learned once it ships",
    body: "I keep a structured roadmap, but a course isn't done until the idea lands in a production system: evals, safety rails, and observability included.",
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
        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div className="principle" key={p.n}>
              <div className="pn">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
