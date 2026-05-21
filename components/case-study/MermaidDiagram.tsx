"use client";

import { useEffect, useState } from "react";

let mermaidPromise: Promise<typeof import("mermaid")["default"]> | null = null;

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#0f172a",
          primaryColor: "#1e293b",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#334155",
          lineColor: "#64748b",
          fontFamily: "var(--font-sans), ui-sans-serif",
        },
      });
      return m.default;
    });
  }
  return mermaidPromise;
}

let counter = 0;

export function MermaidDiagram({ children }: { children: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    counter += 1;
    const id = `mmd-${counter}`;
    loadMermaid()
      .then((mermaid) => mermaid.render(id, children.trim()))
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [children]);

  if (error) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-4 text-xs text-slate-400">
        {children}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 flex h-48 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-xs text-slate-500">
        rendering diagram…
      </div>
    );
  }

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/40 p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
