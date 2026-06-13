import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Shared header for subpages (resume / projects / case studies). Links jump
 * back to the home page sections. `cta` overrides the default "Get in touch".
 */
export function SiteHeader({ cta }: { cta?: ReactNode }) {
  return (
    <header>
      <div className="wrap nav">
        <a className="wordmark" href="/">
          Jamil <em>Mendez.</em>
        </a>
        <nav className="nav-links">
          <a href="/#work">Work</a>
          <a href="/#stack">Stack</a>
          <a href="/#training">Training</a>
          <a href="/#experience">About</a>
          <ThemeToggle />
          {cta ?? (
            <a className="btn" href="/#contact">
              Get in touch
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
