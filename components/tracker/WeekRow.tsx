"use client";

import { useState, useTransition } from "react";
import { updateWeekStatus } from "@/app/dashboard/actions";

export type TrackerWeek = {
  id: string;
  phase: string;
  week_label: string;
  course_title: string;
  url: string | null;
  time_estimate: string | null;
  apply_action: string | null;
  status: "not_started" | "in_progress" | "done";
  notes: string | null;
  artifact_url: string | null;
  objectives: string | null;
  success_metric: string | null;
  data_source: string | null;
  playbook_path: string | null;
};

const STATUSES = [
  { key: "not_started", label: "Not started" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
] as const;

const STATUS_LABEL: Record<TrackerWeek["status"], string> = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Done",
};

const GH_BASE = "https://github.com/Jamil1016/portfolio/blob/main/";

/**
 * One roadmap item as a compact, expandable control-surface row. Collapsed it
 * shows week / title / status; expanded it reveals Learn/Measure/Data/Ships,
 * the course + playbook links, a segmented status control, and the notes /
 * artifact editor. Edits persist via the updateWeekStatus server action.
 */
export function WeekRow({
  week,
  defaultOpen = false,
}: {
  week: TrackerWeek;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [status, setStatus] = useState(week.status);
  const [notes, setNotes] = useState(week.notes ?? "");
  const [artifact, setArtifact] = useState(week.artifact_url ?? "");
  // Last values persisted to the server; the editor is "dirty" when the live
  // values diverge from these, which is what enables the Save button.
  const [savedNotes, setSavedNotes] = useState(week.notes ?? "");
  const [savedArtifact, setSavedArtifact] = useState(week.artifact_url ?? "");
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const dirty = notes !== savedNotes || artifact !== savedArtifact;

  function changeStatus(next: TrackerWeek["status"]) {
    setStatus(next);
    startTransition(async () => {
      await updateWeekStatus(week.id, { status: next });
    });
  }

  function saveText() {
    if (!dirty || pending) return;
    startTransition(async () => {
      await updateWeekStatus(week.id, { notes, artifact_url: artifact });
      setSavedNotes(notes);
      setSavedArtifact(artifact);
      setSaved(true);
    });
  }

  const hasFields = week.objectives || week.success_metric || week.data_source || week.apply_action;

  return (
    <div className={`trk-row ${open ? "is-open" : ""} ${status === "done" ? "done" : ""}`}>
      <button
        type="button"
        className="trk-row-btn"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="wk">{week.week_label}</span>
        <span className="ti">{week.course_title}</span>
        <span className={`st ${status}`}>
          <span className="sdot" aria-hidden />
          {STATUS_LABEL[status]}
        </span>
        <span className="chev" aria-hidden>
          ›
        </span>
      </button>

      {open && (
        <div className="trk-panel">
          {hasFields && (
            <dl className="trk-fields">
              {week.objectives && (
                <div className="trk-field">
                  <dt>Learn</dt>
                  <dd>{week.objectives}</dd>
                </div>
              )}
              {week.success_metric && (
                <div className="trk-field">
                  <dt>Measure</dt>
                  <dd>{week.success_metric}</dd>
                </div>
              )}
              {week.data_source && (
                <div className="trk-field">
                  <dt>Data</dt>
                  <dd>{week.data_source}</dd>
                </div>
              )}
              {week.apply_action && (
                <div className="trk-field ships">
                  <dt>Ships</dt>
                  <dd>{week.apply_action}</dd>
                </div>
              )}
            </dl>
          )}

          {(week.url || week.playbook_path) && (
            <div className="trk-links">
              {week.url && (
                <a href={week.url} target="_blank" rel="noreferrer">
                  Open course ↗
                </a>
              )}
              {week.playbook_path && (
                <a href={`${GH_BASE}${week.playbook_path}`} target="_blank" rel="noreferrer">
                  Full build steps →
                </a>
              )}
            </div>
          )}

          <div className="trk-seg" role="group" aria-label="Status">
            {STATUSES.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`${status === s.key ? "on" : ""} ${s.key}`}
                aria-pressed={status === s.key}
                disabled={pending}
                onClick={() => changeStatus(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="trk-edit">
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setSaved(false);
              }}
              placeholder="Notes, takeaways, blockers…"
              rows={2}
            />
            <input
              type="url"
              value={artifact}
              onChange={(e) => {
                setArtifact(e.target.value);
                setSaved(false);
              }}
              placeholder="Artifact URL (PR, repo, post)…"
            />
            <div className="trk-edit-foot">
              <button
                type="button"
                className="trk-save"
                disabled={pending || !dirty}
                onClick={saveText}
              >
                {pending ? "Saving…" : "Save"}
              </button>
              <span className="saved" aria-live="polite">
                {pending ? "" : dirty ? "Unsaved changes" : saved ? "Saved" : ""}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
