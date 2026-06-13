import { STATS } from "@/lib/site-data";
import { ALL_TAGS } from "@/lib/tags";

export function Stats() {
  return (
    <>
      <section className="stats-band" data-tab="home" data-screen-label="Stats">
        <div className="wrap stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div
                className="num"
                data-count={s.value}
                data-decimals={s.decimals}
                data-suffix={s.suffix}
              >
                {/* Real value as text fallback; HomeEffects animates from 0. */}
                {s.value.toFixed(s.decimals)}
                {s.suffix}
              </div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="ticker" data-tab="home" data-screen-label="Tag ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...ALL_TAGS, ...ALL_TAGS].map((t, i) => (
            <span key={`${t}-${i}`}>{t} ·</span>
          ))}
        </div>
      </div>
    </>
  );
}
