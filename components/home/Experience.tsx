import { EXPERIENCE } from "@/lib/site-data";

export function Experience() {
  return (
    <section className="band" id="experience" data-screen-label="Experience">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Experience log</div>
          <h2>Where I&rsquo;ve run things.</h2>
        </div>
        <div className="xp">
          {EXPERIENCE.map((e) => (
            <div className="xp-row" key={e.when}>
              <div className="when">
                {e.current && <span className="mini-dot dot" />}
                {e.when}
              </div>
              <div>
                <div className="role">{e.role}</div>
                <p className="what">{e.what}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
