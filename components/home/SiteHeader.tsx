import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { RESUME_URL } from "@/lib/site-data";

const MOBILE_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/about", label: "About" },
  { href: RESUME_URL, label: "Resume" },
];

/**
 * Shared header for subpages (about / projects / case studies). Links jump
 * back to the home page sections. `cta` overrides the default "Get in touch".
 */
export function SiteHeader({ cta }: { cta?: ReactNode }) {
  return (
    <header>
      <div className="wrap nav">
        <a className="wordmark" href="/">
          Jamil <em>Mendez.</em>
        </a>
        <MobileMenu links={MOBILE_LINKS} cta={{ href: "/#contact", label: "Get in touch" }} />
        <nav className="nav-links">
          <a href="/#work">Work</a>
          <a href="/#stack">Stack</a>
          <a href="/about">About</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
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
