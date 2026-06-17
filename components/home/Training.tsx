import { fetchLearningSnapshot, statusLevel, type PublicWeek } from "@/lib/learning";
import { STUDY_TO_PROD } from "@/lib/site-data";

function statusMeta(status: PublicWeek["status"]): string {
  if (status === "done") return "done";
  if (status === "in_progress") return "in progress";
  return "queued";
}
function statusWidth(status: PublicWeek["status"]): number {
  if (status === "done") return 100;
  if (status === "in_progress") return 50;
  return 0;
}

export async function Training() {
  const snap = await fetchLearningSnapshot();
  const hasData = snap.weeks.length > 0;
  const pct = snap.totalCount > 0 ? Math.round((snap.doneCount / snap.totalCount) * 100) : 0;

  // Forward-looking slice of the roadmap, anchored on the current week.
  const anchor = snap.now
    ? Math.max(0, snap.weeks.findIndex((w) => w.status === "in_progress"))
    : 0;
  const roadmap = snap.weeks.slice(anchor, anchor + 5);

  // One cell per roadmap week, colored by real status.
  const logWeeks = snap.weeks.filter((w) => w.phase !== "Capstone");

  return (
    <section className="band" id="training" data-tab="training" data-screen-label="Training">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: 28 }}>
          <div className="eyebrow">Training · in public</div>
          <h2>Always in training.</h2>
        </div>

        <div className="training-top">
          <div className="tr-left">
            <p className="tr-lead">
              I keep a structured roadmap and track every course, paper, and build
              exercise against it, and I only count a thing as learned once it ships
              into a system.
            </p>

            {hasData ? (
              <div className="roadmap">
                <div className="blk-head">
                  <span>On the roadmap</span>
                  <span className="meta">
                    {snap.doneCount}/{snap.totalCount} done
                  </span>
                </div>
                {roadmap.map((w) => (
                  <div className="rm-item" key={w.sort_order}>
                    <div className="rm-top">
                      <span className="rm-name">
                        {w.status === "in_progress" && <span className="dot" />}
                        {w.course_title}
                      </span>
                      <span className="rm-meta">{statusMeta(w.status)}</span>
                    </div>
                    <div className="prog">
                      <i data-w={statusWidth(w.status)} />
                    </div>
                    <div className="rm-sub">
                      {w.phase} · {w.week_label}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="roadmap">
                <div className="blk-head">
                  <span>On the roadmap</span>
                  <span className="meta">private</span>
                </div>
                <p className="rm-sub" style={{ marginTop: 14 }}>
                  The full roadmap lives in the magic-link tracker.
                </p>
              </div>
            )}
          </div>

          <div className="tr-right">
            <div className="now-tile">
              <div className="nl">
                <span className="dot" /> Now learning
              </div>
              {snap.now ? (
                <>
                  <h3>{snap.now.course_title}</h3>
                  <div className="wk">
                    {snap.now.phase} · {snap.now.week_label}
                  </div>
                  <div className="prog">
                    <i data-w={pct} />
                  </div>
                  <div className="pct">
                    <span>roadmap</span>
                    <span>{pct}%</span>
                  </div>
                  {snap.nowIndex && (
                    <div className="focus">
                      Week {snap.nowIndex} of {snap.totalCount} on the roadmap.
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3>Between weeks. Planning the next push.</h3>
                  <div className="focus">
                    The current course shows here when one is in progress.
                  </div>
                </>
              )}
            </div>

            {hasData && (
              <div className="studylog">
                <div className="sl-head">
                  <span>Roadmap · {snap.totalCount} weeks</span>
                  <span className="sl-legend">
                    less <i className="lvl1" />
                    <i className="lvl2" />
                    <i className="lvl3" />
                    <i className="lvl4" /> more
                  </span>
                </div>
                <div className="sl-grid">
                  {logWeeks.map((w) => {
                    const lvl = statusLevel(w.status);
                    return (
                      <i
                        key={w.sort_order}
                        className={lvl ? `sl-c lvl${lvl}` : "sl-c"}
                        title={`${w.course_title}: ${statusMeta(w.status)}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <a className="btn ghost" href="/dashboard">
              Open the full tracker ↗
            </a>
            <div className="gated">Magic-link gated · Supabase auth</div>
          </div>
        </div>

        <div className="s2p">
          <div className="blk-head">
            <span>From study to production</span>
            <span className="meta">learned → shipped</span>
          </div>
          <div className="s2p-grid">
            {STUDY_TO_PROD.map((s) => (
              <div className="s2p-card" key={s.title}>
                <div className="learned">{s.learned}</div>
                <div className="arrow">↓ shipped</div>
                <div className="shipped">
                  {s.title}
                  <small>{s.detail}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
