"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ALL_TAGS } from "@/lib/tags";
import type { ProjectMeta } from "@/lib/projects";

export function TagFilter({ projects }: { projects: ProjectMeta[] }) {
  const [active, setActive] = useState<string[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const match = hash.match(/tag=([a-z0-9,-]+)/i);
    if (!match) return;
    const fromUrl = match[1]
      .split(",")
      .filter((t) => (ALL_TAGS as readonly string[]).includes(t));
    if (fromUrl.length > 0) setActive(fromUrl);
  }, []);

  useEffect(() => {
    if (active.length === 0) {
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }
      return;
    }
    history.replaceState(null, "", `#tag=${active.join(",")}`);
  }, [active]);

  const toggle = useCallback((tag: string) => {
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clear = useCallback(() => setActive([]), []);

  const matches = useCallback(
    (project: ProjectMeta) => {
      if (active.length === 0) return true;
      return project.tags.some((t) => active.includes(t));
    },
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {ALL_TAGS.map((tag) => {
          const isActive = active.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`rounded-md border px-2 py-0.5 text-[11px] font-mono transition-colors ${
                isActive
                  ? "border-emerald-700 bg-emerald-900/40 text-emerald-200"
                  : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {active.length > 0 && (
        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="text-slate-500">Showing:</span>
          <span className="text-slate-200">{active.join(", ")}</span>
          <button
            onClick={clear}
            className="text-emerald-400 hover:text-emerald-300"
          >
            clear
          </button>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {projects.map((p) => {
          const visible = matches(p);
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`block rounded-xl border border-slate-800 p-5 transition-opacity hover:border-slate-700 ${
                visible ? "opacity-100" : "opacity-40"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-medium text-slate-50">{p.name}</h2>
                {p.publicRepoStatus === "coming" && (
                  <span className="font-mono text-xs text-slate-500">
                    OSS · {p.publicEtaWeek}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
