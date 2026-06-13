"use client";

import { useEffect, useState } from "react";

type Theme = "cream" | "dark" | "colorful";
const THEMES: { key: Theme; label: string }[] = [
  { key: "cream", label: "Cream" },
  { key: "dark", label: "Dark" },
  { key: "colorful", label: "Color" },
];

export function ThemeToggle() {
  // Hydrate from the attribute the no-flash init script already set.
  const [theme, setTheme] = useState<Theme>("cream");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "cream";
    setTheme(current);
    setMounted(true);
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className="theme-toggle tt-link"
      role="group"
      aria-label="Color theme"
      // Avoid a hydration flash of the wrong active button before mount.
      suppressHydrationWarning
    >
      {THEMES.map((t) => (
        <button
          key={t.key}
          type="button"
          className={mounted && theme === t.key ? "on" : undefined}
          aria-pressed={mounted ? theme === t.key : undefined}
          onClick={() => choose(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
