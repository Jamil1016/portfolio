import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Principles } from "@/components/home/Principles";

describe("Principles proof links", () => {
  it("backs every principle with a link to a case study", () => {
    render(<Principles />);
    const rows = Array.from(document.querySelectorAll(".approach-row"));
    expect(rows.length).toBe(3);
    for (const row of rows) {
      const links = row.querySelectorAll('a[href^="/projects/"]');
      expect(links.length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("link", { name: /pipeline guardian/i })).toHaveAttribute("href", "/projects/pipeline-guardian");
  });
});
