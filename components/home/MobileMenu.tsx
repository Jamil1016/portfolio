"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export type MobileLink = {
  href: string;
  label: string;
  /** scroll-spy key, only used by the home-page nav */
  tablink?: string;
  /** show the "in progress" dot (Training) */
  dot?: boolean;
};

/**
 * Mobile-only navigation: a hamburger button that opens a full-screen overlay
 * panel carrying the section links, theme toggle, and CTA. Shown only below the
 * nav breakpoint via CSS; the desktop `.nav-links` markup is left untouched.
 */
export function MobileMenu({
  links,
  cta,
}: {
  links: MobileLink[];
  cta: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);

  // Esc to close + lock body scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="mm-bars" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </button>

      {open && (
        <div
          id="mobile-menu-panel"
          className="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className="mm-links">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={l.tablink ? "tablink" : undefined}
                data-tablink={l.tablink}
                onClick={() => setOpen(false)}
              >
                <span className="mm-label">
                  {l.label}
                  {l.dot && <span className="mini-dot" />}
                </span>
                <span className="mm-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="mm-foot">
            <a className="btn" href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
