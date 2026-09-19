"use client";

import { useEffect, useId, useRef, useState } from "react";
import { mermaidOutline } from "@/lib/mermaid-outline";

let mermaidImport: Promise<typeof import("mermaid")["default"]> | null = null;
function getMermaid() {
  if (!mermaidImport) mermaidImport = import("mermaid").then((m) => m.default);
  return mermaidImport;
}

// Diagram palette per site theme, so diagrams stay readable on cream + dark.
function themeVars(theme: string) {
  const cream = theme === "cream";
  return cream
    ? {
        background: "#EDE4CF",
        primaryColor: "#F4EEE1",
        primaryTextColor: "#1E1A12",
        primaryBorderColor: "#1E1A12",
        lineColor: "rgba(30,26,18,0.65)",
        secondaryColor: "#E3D8BE",
        tertiaryColor: "#F4EEE1",
        fontFamily: "var(--font-sans), ui-sans-serif",
      }
    : {
        background: "#101624",
        primaryColor: "#0B0F1A",
        primaryTextColor: "#EFE8D6",
        primaryBorderColor: "#3A4255",
        lineColor: "#8a93a6",
        secondaryColor: "#171F30",
        tertiaryColor: "#0B0F1A",
        fontFamily: "var(--font-sans), ui-sans-serif",
      };
}

export function MermaidDiagram({ children: raw }: { children?: string }) {
  const children = typeof raw === "string" ? raw : "";
  const rawId = useId();
  const base = `mmd-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const counter = useRef(0);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    function render() {
      if (!children.trim()) {
        setError("empty diagram source");
        return;
      }
      const theme = document.documentElement.dataset.theme || "cream";
      getMermaid()
        .then((mermaid) => {
          mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            themeVariables: themeVars(theme),
          });
          return mermaid.render(`${base}-${counter.current++}`, children.trim());
        })
        .then(({ svg }) => {
          if (!cancelled) {
            setSvg(svg);
            setError("");
          }
        })
        .catch((err: unknown) => {
          if (!cancelled) setError(String(err));
        });
    }

    render();

    // Re-render when the user switches theme.
    const obs = new MutationObserver((muts) => {
      if (muts.some((m) => m.attributeName === "data-theme")) render();
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelled = true;
      obs.disconnect();
    };
  }, [children, base]);

  if (error) {
    return <pre className="cs-diagram cs-diagram--state">{children}</pre>;
  }
  if (!svg) {
    // Server-rendered state. The <noscript> outline gives crawlers and no-JS
    // readers the flow as text; with JS on, Mermaid replaces this block.
    return (
      <div className="cs-diagram cs-diagram--state">
        <span>rendering diagram…</span>
        <noscript>
          <ul className="cs-diagram-outline">
            {mermaidOutline(children).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </noscript>
      </div>
    );
  }
  return <div className="cs-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
