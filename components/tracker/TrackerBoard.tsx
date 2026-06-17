"use client";

import { useState } from "react";
import { WeekRow, type TrackerWeek } from "./WeekRow";

type Filter = "all" | "not_started" | "in_progress" | "done";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "not_started", label: "Not started" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
];

/**
 * The interactive dashboard board: a progress summary with current focus, a
 * status filter, and the roadmap grouped into phases (each with its own
 * progress). Counts always reflect the full roadmap; the filter only changes
 * which rows are shown. The "Capstone" phase is excluded from the headline
 * total, mirroring the public home snapshot.
 */
export function TrackerBoard({ weeks }: { weeks: TrackerWeek[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counted = weeks.filter((w) => w.phase !== "Capstone");
  const total = counted.length;
  const done = counted.filter((w) => w.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const now = weeks.find((w) => w.status === "in_progress") ?? null;

  const counts: Record<Filter, number> = {
    all: weeks.length,
    not_started: weeks.filter((w) => w.status === "not_started").length,
    in_progress: weeks.filter((w) => w.status === "in_progress").length,
    done: weeks.filter((w) => w.status === "done").length,
  };

  // Preserve first-seen phase order.
  const phases: string[] = [];
  for (const w of weeks) if (!phases.includes(w.phase)) phases.push(w.phase);

  const matches = (w: TrackerWeek) => filter === "all" || w.status === filter;

  return (
    <>
      <section className="trk-summary">
        <div className="trk-meter">
          <div className="big">
            {done}
            <small> / {total}</small>
          </div>
          <div className="lbl">Weeks shipped</div>
          <div className="trk-bar">
            <i style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="trk-focus">
          <div className="nl">
            <span className="dot" aria-hidden /> Now
          </div>
          {now ? (
            <>
              <h2>{now.course_title}</h2>
              <div className="wk">
                {now.phase} · {now.week_label}
              </div>
            </>
          ) : (
            <p className="none">Nothing in progress. Pick an item below to start.</p>
          )}
        </div>
      </section>

      <div className="trk-filter" role="group" aria-label="Filter by status">
        <span className="fl-label">Filter</span>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`trk-chip ${filter === f.key ? "on" : ""}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="n">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {counts[filter] === 0 && <div className="trk-empty">No items match this filter.</div>}

      {phases.map((phase) => {
        const items = weeks.filter((w) => w.phase === phase);
        const shown = items.filter(matches);
        if (shown.length === 0) return null;
        const pTotal = items.length;
        const pDone = items.filter((w) => w.status === "done").length;
        const pPct = pTotal ? Math.round((pDone / pTotal) * 100) : 0;
        return (
          <section className="trk-phase" key={phase}>
            <div className="trk-phase-head">
              <span className="ph">{phase}</span>
              <span className="ct">
                {pDone}/{pTotal} done
              </span>
            </div>
            <div className="trk-phase-bar">
              <i style={{ width: `${pPct}%` }} />
            </div>
            {shown.map((w) => (
              <WeekRow key={w.id} week={w} defaultOpen={w.status === "in_progress"} />
            ))}
          </section>
        );
      })}
    </>
  );
}
