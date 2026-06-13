import { STACK } from "@/lib/site-data";

export function Stack() {
  return (
    <section className="band" id="stack" data-screen-label="Technical stack">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Technical stack</div>
          <h2>What I build with.</h2>
        </div>
        <div className="stack-grid">
          {STACK.map((col) => (
            <div className="stack-col" key={col.title}>
              <h3>{col.title}</h3>
              {col.skills.map((s) => (
                <div className="skill" key={s.name}>
                  <span className="nm">{s.name}</span>
                  <span className="pc">{s.pct}</span>
                  <span className="bar">
                    <i data-w={s.pct} />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
