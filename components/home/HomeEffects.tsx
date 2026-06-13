"use client";

import { useEffect } from "react";

/**
 * Tab-view controller for the home page. The design groups sections by
 * data-tab (home / work / stack / training / about); clicking a nav tab shows
 * only that segment. Also runs count-up + bar-fill animations for whichever
 * segment becomes visible. Reduced-motion sets final values immediately.
 */
export function HomeEffects() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".home-shell");
    if (!shell) return;
    const root = document.documentElement;
    const motionOn = () =>
      root.dataset.motion !== "off" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- animation helpers ----------
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

    function runAnims(scope: ParentNode) {
      scope.querySelectorAll<HTMLElement>(".num[data-count]").forEach(countUp);
      scope.querySelectorAll<HTMLElement>("i[data-w]").forEach((b) => {
        const w = (b.dataset.w || "0") + "%";
        // reset then fill so it re-animates each time the tab is shown
        b.style.width = "0%";
        if (!motionOn()) {
          b.style.width = w;
        } else {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              b.style.width = w;
            });
          });
        }
      });
    }

    // ---------- tab switching ----------
    const links = Array.from(
      document.querySelectorAll<HTMLElement>(".tablink[data-tablink]"),
    );
    const setActiveLink = (tab: string) =>
      links.forEach((l) => l.classList.toggle("active", l.dataset.tablink === tab));

    function activate(tab: string, scrollTop = true) {
      shell!.setAttribute("data-active", tab);
      setActiveLink(tab);
      const visible = shell!.querySelectorAll<HTMLElement>(
        `main > [data-tab="${tab}"]`,
      );
      visible.forEach((el) => runAnims(el));
      if (scrollTop) window.scrollTo({ top: 0, behavior: "auto" });
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

    // initial state (server rendered data-active="home")
    const initial = shell.getAttribute("data-active") || "home";
    activate(initial, false);

    return () => {
      clickHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
    };
  }, []);

  return null;
}
