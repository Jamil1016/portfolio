"use client";

import { useState, useTransition } from "react";
import { StatusBadge } from "./StatusBadge";
import { updateWeekStatus } from "@/app/dashboard/actions";

export type WeekRow = {
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

export function WeekCard({ week }: { week: WeekRow }) {
  const [status, setStatus] = useState(week.status);
  const [notes, setNotes] = useState(week.notes ?? "");
  const [artifactUrl, setArtifactUrl] = useState(week.artifact_url ?? "");
  const [pending, startTransition] = useTransition();

  function change(next: WeekRow["status"]) {
    setStatus(next);
    startTransition(async () => {
      await updateWeekStatus(week.id, { status: next });
    });
  }

  function saveText() {
    startTransition(async () => {
      await updateWeekStatus(week.id, { notes, artifact_url: artifactUrl });
    });
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate-500">{week.week_label}</p>
          <h3 className="text-lg text-slate-50">
            {week.url ? (
              <a href={week.url} target="_blank" rel="noreferrer" className="hover:text-emerald-300">
                {week.course_title} →
              </a>
            ) : (
              week.course_title
            )}
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      {week.time_estimate && (
        <p className="mt-2 text-xs text-slate-500">Time estimate · {week.time_estimate}</p>
      )}
      {(week.objectives || week.success_metric || week.data_source) && (
        <dl className="mt-3 space-y-1.5 text-sm">
          {week.objectives && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-xs uppercase text-emerald-500/80">Learn</dt>
              <dd className="text-slate-300">{week.objectives}</dd>
            </div>
          )}
          {week.success_metric && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-xs uppercase text-amber-500/80">Measure</dt>
              <dd className="text-slate-300">{week.success_metric}</dd>
            </div>
          )}
          {week.data_source && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-xs uppercase text-sky-500/80">Data</dt>
              <dd className="text-slate-300">{week.data_source}</dd>
            </div>
          )}
        </dl>
      )}
      {week.apply_action && (
        <p className="mt-2 text-sm text-slate-400">
          <span className="font-mono text-xs uppercase text-slate-500">Ships</span> · {week.apply_action}
        </p>
      )}
      {week.playbook_path && (
        <a
          href={`https://github.com/Jamil1016/portfolio/blob/main/${week.playbook_path}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs text-emerald-400 hover:text-emerald-300"
        >
          Full build steps →
        </a>
      )}

      <div className="mt-4 flex gap-2">
        {(["not_started", "in_progress", "done"] as const).map((s) => (
          <button
            key={s}
            onClick={() => change(s)}
            disabled={pending}
            className={`rounded-md border px-2 py-1 text-xs ${
              status === s
                ? "border-emerald-700 bg-emerald-900/40 text-emerald-200"
                : "border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveText}
          placeholder="Notes, takeaways, blockers..."
          className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          rows={2}
        />
        <input
          type="url"
          value={artifactUrl}
          onChange={(e) => setArtifactUrl(e.target.value)}
          onBlur={saveText}
          placeholder="Artifact URL (e.g., PR, repo, blog post)"
          className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200"
        />
      </div>
    </div>
  );
}
