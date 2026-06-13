"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement behaviors for the home page, applied to
 * server-rendered DOM after mount: count-up stats, bar fills, nav scrollspy,
 * and the scroll hint. No-JS users still see real values (rendered as text)
 * and full content; this only adds motion.
 */
export function HomeEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const motionOn = () =>
      root.dataset.motion !== "off" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    // ---------- count-up + bar fills (once, when scrolled into view) ----------
    function countUp(el: HTMLElement) {
      const target = parseFloat(el.dataset.count || "0");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      if (!motionOn()) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      let start: number | null = null;
      const dur = 1500;
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
          en.target
            .querySelectorAll<HTMLElement>(".num[data-count]")
            .forEach(countUp);
          en.target.querySelectorAll<HTMLElement>("i[data-w]").forEach((b) => {
            const w = b.dataset.w || "0";
            if (!motionOn()) {
              b.style.width = w + "%";
            } else {
              requestAnimationFrame(() => {
                b.style.width = w + "%";
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

    // ---------- scrollspy: highlight the nav tab for the section in view ----------
    const SECTION_TAB: Record<string, string> = {
      hero: "home",
      work: "work",
      stack: "stack",
      training: "training",
      experience: "about",
      contact: "about",
    };
    const links = Array.from(
      document.querySelectorAll<HTMLElement>(".tablink[data-tablink]"),
    );
    const setActive = (tab: string) =>
      links.forEach((l) => l.classList.toggle("active", l.dataset.tablink === tab));

    let spyLock = false;
    let spyTimer: ReturnType<typeof setTimeout> | undefined;
    const clickHandlers: Array<[HTMLElement, () => void]> = [];
    document.querySelectorAll<HTMLElement>("[data-tablink]").forEach((l) => {
      const handler = () => {
        const tab = l.dataset.tablink!;
        if (l.classList.contains("tablink")) setActive(tab);
        spyLock = true;
        clearTimeout(spyTimer);
        spyTimer = setTimeout(() => {
          spyLock = false;
        }, 900);
      };
      l.addEventListener("click", handler);
      clickHandlers.push([l, handler]);
    });

    const spyTargets: Element[] = [];
    Object.keys(SECTION_TAB).forEach((id) => {
      const el =
        id === "hero" ? document.querySelector(".hero") : document.getElementById(id);
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
            setActive((en.target as HTMLElement).dataset.spyTab || "home");
        });
      },
      { rootMargin: "-46% 0px -48% 0px", threshold: 0 },
    );
    spyTargets.forEach((t) => spyIO.observe(t));
    cleanups.push(() => {
      spyIO.disconnect();
      clickHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      clearTimeout(spyTimer);
    });

    // ---------- scroll hint ----------
    const hint = document.getElementById("scroll-hint");
    if (hint) {
      const updHint = () => {
        const doc = document.documentElement;
        const canScroll = doc.scrollHeight > window.innerHeight + 60;
        const atBottom =
          window.innerHeight + window.scrollY >= doc.scrollHeight - 110;
        hint.classList.toggle("show", canScroll && !atBottom);
      };
      window.addEventListener("scroll", updHint, { passive: true });
      window.addEventListener("resize", updHint);
      const t = setTimeout(updHint, 400);
      cleanups.push(() => {
        window.removeEventListener("scroll", updHint);
        window.removeEventListener("resize", updHint);
        clearTimeout(t);
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
