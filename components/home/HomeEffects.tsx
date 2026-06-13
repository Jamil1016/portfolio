"use client";

import { useEffect } from "react";

/**
 * Single-page home behaviors:
 * - Nav / CTA / footer links smooth-scroll to their section (offset for the
 *   sticky header). No view replacement — everything is one scrolling page.
 * - Scroll-spy moves the nav underline to the section currently in view.
 * - Count-up + bar-fill animations fire when a section scrolls into view.
 *   Reduced-motion sets final values immediately.
 */
export function HomeEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const HEADER = 73;
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

    // ---------- nav underline ----------
    const links = Array.from(
      document.querySelectorAll<HTMLElement>(".tablink[data-tablink]"),
    );
    const setActiveLink = (tab: string) =>
      links.forEach((l) => l.classList.toggle("active", l.dataset.tablink === tab));

    // ---------- smooth-scroll on click ----------
    let spyLock = false;
    let spyTimer: ReturnType<typeof setTimeout> | undefined;
    const clickHandlers: Array<[HTMLElement, (e: Event) => void]> = [];
    document.querySelectorAll<HTMLAnchorElement>("[data-tablink]").forEach((l) => {
      const handler = (e: Event) => {
        const hash = l.getAttribute("href") || "";
        const target = hash.startsWith("#") ? document.querySelector(hash) : null;
        if (!target) return; // let non-anchor links behave normally
        e.preventDefault();
        const tab = l.dataset.tablink;
        if (tab) setActiveLink(tab);
        const y =
          (target as HTMLElement).getBoundingClientRect().top + window.scrollY - HEADER;
        window.scrollTo({ top: Math.max(0, y), behavior: motionOn() ? "smooth" : "auto" });
        // freeze the spy briefly so the underline lands on the clicked tab
        spyLock = true;
        clearTimeout(spyTimer);
        spyTimer = setTimeout(() => {
          spyLock = false;
        }, 800);
      };
      l.addEventListener("click", handler);
      clickHandlers.push([l, handler]);
    });
    cleanups.push(() => {
      clickHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      clearTimeout(spyTimer);
    });

    // ---------- scroll-spy ----------
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
        if (spyLock) return;
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
