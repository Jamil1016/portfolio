# Mobile Structure — Design

**Date:** 2026-06-21
**Status:** Approved

## Principle

**Additive, not a rewrite.** Build mobile behavior on top of the existing desktop
structure. The desktop layout (≥1100px) must render byte-for-byte as it does today.
All changes are new media queries and a new mobile-only navigation layer.

## Problem

The portfolio has a single `@media (max-width: 1100px)` breakpoint in `app/home.css`.
Below it, the section nav links are hidden with `display: none` and **nothing
replaces them**, so navigation is broken for both tablets and phones. There is no
phone-size (`≤600px`) breakpoint, so desktop-scale type (hero `h1`, 52px stat
numbers) and 2-up stat grids are cramped/overflowing on phones.

## Scope

In: home (single page), resume, `/projects/<slug>` case studies — all driven by
`app/home.css` — plus the two shared headers `Nav.tsx` and `SiteHeader.tsx`.

Out: `app/about/page.tsx` (standalone Tailwind, already responsive, no shared
header — leaving it as-is would otherwise mean replacing structure). The private
dashboard/tracker is also out of scope.

## 1. Mobile navigation — new `MobileMenu` client component

`components/home/MobileMenu.tsx` (`"use client"`):
- A `☰` hamburger button plus a full-screen overlay panel containing the nav
  links, the theme toggle, and the CTA.
- Props: `links: { href: string; label: string; tablink?: string; dot?: boolean }[]`
  and `cta: { href: string; label: string }`, so each header supplies its own link
  style — `Nav` uses `#hash` + `data-tablink` (scroll-spy), `SiteHeader` uses
  `/#hash`.
- Behavior: `aria-expanded` + `aria-controls` on the button; **Esc closes**; **body
  scroll-lock** while open; **auto-close on link tap**. The `ThemeToggle` component
  is reused inside the panel.

Integration: both `Nav.tsx` and `SiteHeader.tsx` render `<MobileMenu .../>` *in
addition to* their existing `.nav-links` markup. The existing markup is unchanged.

## 2. CSS — navigation breakpoint (`app/home.css`, additive)

- `.mobile-menu-btn` (the hamburger): `display: none` by default; shown at
  `≤1100px`.
- At `≤1100px`, hide the full `.nav-links` (links + toggle + CTA) since the menu
  now carries them. (Today only the section links hide; the btn/toggle stayed.)
- Overlay panel styles: fixed, full-viewport, `var(--paper)` background, large
  tap-target links, slide/fade in. Respect `prefers-reduced-motion`.
- Desktop (≥1100px) is untouched: hamburger stays `display:none`, `.nav-links`
  shows as today.

## 3. CSS — phone breakpoint `@media (max-width: 600px)` (`app/home.css`, new block)

- Hero `h1` and section headings scaled down (use `clamp()` where practical).
- `.stat .num` 52px → ~34–38px; `.stats` grid → single column.
- Tighten section vertical padding and `.card` padding.
- `.cs-prose` font-size/line-height tuned for phone reading.
- Horizontal padding already uses `clamp(28px, 4vw, 72px)` — no change.

## 4. Accessibility

- Hamburger is a real `<button>` with `aria-label`, `aria-expanded`, `aria-controls`.
- Esc closes; focus returns to the button on close.
- Body scroll locked while the overlay is open.

## 5. Testing

`tests/components/MobileMenu.test.tsx` (TDD, written first):
- Panel is closed initially (links not visible / `aria-expanded=false`).
- Clicking the hamburger opens it and renders all supplied links + CTA.
- Esc closes it.
- Clicking a link closes it.

## Out of scope / non-goals

- No visual redesign of the desktop site.
- No change to `about` page structure.
- No new dependencies.
