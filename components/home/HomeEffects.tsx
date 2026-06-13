"use client";

import { useEffect } from "react";

/**
 * Home-page behavior controller.
 *
 * - Home tab = the full single-page scroll (all segments). Scroll-spy moves the
 *   nav underline as you scroll through it.
 * - Work / Stack / Training / About = isolate that one segment.
 * - Count-up + bar-fill animations fire when a segment scrolls into view (home)
 *   or becomes visible after a tab switch. Reduced-motion sets finals at once.
 */
export function HomeEffects() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".home-shell");
    if (!shell) return;
    const root = document.documentElement;
    const motionOn = () =>
      root.dataset.motion !== "off" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    // ---------- count-up + bar fills (once, on first reveal) ----------
    function countUp(el: HTMLElement) {
      const target = parseFloat(el.dataset.count || "0");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      if (!motionOn()) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      let start: number | null = null;
      const dur = 1400;
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * e).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const seen = new WeakSet<Element>();
    const animIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || seen.has(en.target)) return;
          seen.add(en.target);
          en.target.querySelectorAll<HTMLElement>(".num[data-count]").forEach(countUp);
          en.target.querySelectorAll<HTMLElement>("i[data-w]").forEach((b) => {
            const w = (b.dataset.w || "0") + "%";
            if (!motionOn()) {
              b.style.width = w;
            } else {
              requestAnimationFrame(() => {
                b.style.width = w;
              });
            }
          });
        });
      },
      { threshold: 0.25 },
    );
    [".stats-band", "#stack", "#training"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) animIO.observe(el);
    });
    cleanups.push(() => animIO.disconnect());

    // ---------- nav underline + tab switching ----------
    const links = Array.from(
      document.querySelectorAll<HTMLElement>(".tablink[data-tablink]"),
    );
    const setActiveLink = (tab: string) =>
      links.forEach((l) => l.classList.toggle("active", l.dataset.tablink === tab));

    function activate(tab: string) {
      shell!.setAttribute("data-active", tab);
      setActiveLink(tab);
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    const clickHandlers: Array<[HTMLElement, (e: Event) => void]> = [];
    document.querySelectorAll<HTMLElement>("[data-tablink]").forEach((l) => {
      const handler = (e: Event) => {
        const tab = l.dataset.tablink;
        if (!tab) return;
        e.preventDefault();
        activate(tab);
      };
      l.addEventListener("click", handler);
      clickHandlers.push([l, handler]);
    });
    cleanups.push(() =>
      clickHandlers.forEach(([el, h]) => el.removeEventListener("click", h)),
    );

    // ---------- scroll-spy (home scroll view only) ----------
    const SECTION_TAB: Record<string, string> = {
      hero: "home",
      work: "work",
      stack: "stack",
      training: "training",
      experience: "about",
      contact: "about",
    };
    const spyTargets: Element[] = [];
    Object.keys(SECTION_TAB).forEach((id) => {
      const el = id === "hero" ? document.querySelector(".hero") : document.getElementById(id);
      if (el) {
        (el as HTMLElement).dataset.spyTab = SECTION_TAB[id];
        spyTargets.push(el);
      }
    });
    const spyIO = new IntersectionObserver(
      (entries) => {
        // Only drive the underline from scroll position in the full-scroll view.
        if (shell!.dataset.active !== "home") return;
        entries.forEach((en) => {
          if (en.isIntersecting)
            setActiveLink((en.target as HTMLElement).dataset.spyTab || "home");
        });
      },
      { rootMargin: "-46% 0px -48% 0px", threshold: 0 },
    );
    spyTargets.forEach((t) => spyIO.observe(t));
    cleanups.push(() => spyIO.disconnect());

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
