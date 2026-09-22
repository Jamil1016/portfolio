import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Work } from "@/components/home/Work";
import { projects, PRODUCTION_COUNT } from "@/lib/projects";

describe("Work", () => {
  it("leads with the production count, not the catalogue size", () => {
    render(<Work />);
    expect(screen.getByText(new RegExp(`${PRODUCTION_COUNT} in production`))).toBeInTheDocument();
  });

  it("lists production systems openly and folds the rest into Experiments", () => {
    render(<Work />);
    const folded = document.querySelector("details.ledger-more") as HTMLElement;
    expect(folded).toHaveTextContent(/experiments, pilots and personal tools/i);
    const rest = projects.slice(3);
    for (const p of rest) {
      const link = screen.getByRole("link", { name: new RegExp(p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
      if (p.prod === "production") expect(folded.contains(link)).toBe(false);
      else expect(folded.contains(link)).toBe(true);
    }
    expect(within(folded).getAllByRole("link")).toHaveLength(rest.filter((p) => p.prod !== "production").length);
  });

  it("shows the featured cover image when the project has one", () => {
    render(<Work />);
    const featured = projects[0];
    if (featured.cover) {
      expect(screen.getByRole("img", { name: featured.cover.alt })).toHaveAttribute("src", featured.cover.src);
    }
  });
});
