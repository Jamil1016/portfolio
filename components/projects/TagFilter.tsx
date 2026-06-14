"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ALL_TAGS } from "@/lib/tags";
import type { ProjectMeta } from "@/lib/projects";

function readActiveFromHash(): string[] {
  if (typeof window === "undefined") return [];
  const match = window.location.hash.match(/tag=([a-z0-9,-]+)/i);
  if (!match) return [];
  return match[1]
    .split(",")
    .filter((t) => (ALL_TAGS as readonly string[]).includes(t));
}

export function TagFilter({ projects }: { projects: ProjectMeta[] }) {
  // Lazy init: read URL hash synchronously during hydration so deep-linked
  // filters don't get clobbered by a separate mount-time effect.
  const [active, setActive] = useState<string[]>(readActiveFromHash);

  const initialMountRef = useRef(true);
  useEffect(() => {
    if (initialMountRef.current) {
      initialMountRef.current = false;
      return;
    }
    if (active.length === 0) {
      history.replaceState(null, "", window.location.pathname);
    } else {
      history.replaceState(null, "", `#tag=${active.join(",")}`);
    }
  }, [active]);

  const toggle = useCallback((tag: string) => {
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clear = useCallback(() => setActive([]), []);

  const matches = useCallback(
    (project: ProjectMeta) => {
      if (active.length === 0) return true;
      return project.tags.some((t) => active.includes(t));
    },
    [active],
  );

  return (
    <div>
      <div className="tagfilter-tags">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={active.includes(tag) ? "tf-tag on" : "tf-tag"}
            aria-pressed={active.includes(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {active.length > 0 && (
        <div className="tf-showing">
          <span>Showing</span>
          <span className="val">{active.join(", ")}</span>
          <button type="button" onClick={clear} className="clear">
            clear
          </button>
        </div>
      )}

      <div className="proj-list">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className={matches(p) ? "proj-row" : "proj-row dimmed"}
          >
            <span className="pr-name">{p.name}</span>
            <div>
              <div className="pr-desc">{p.tagline}</div>
              <div className="pr-tags">
                {p.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <span className={`pr-st${p.prod === "production" ? " live" : ""}`}>
              {p.prod === "production" ? "● In production" : "Prototype"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
