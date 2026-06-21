import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stack } from "@/components/home/Stack";
import { STACK } from "@/lib/site-data";

describe("Stack", () => {
  it("renders every skill with its name and proof phrase", () => {
    render(<Stack />);
    for (const col of STACK) {
      for (const skill of col.skills) {
        expect(screen.getByText(skill.name)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(escapeRegExp(skill.proof)))).toBeInTheDocument();
      }
    }
  });

  it("links each skill to its project case study", () => {
    render(<Stack />);
    for (const col of STACK) {
      for (const skill of col.skills) {
        // A project can back several skills, so match all links with that label
        // and require every one of them to point at the right case study.
        const links = screen.getAllByRole("link", {
          name: new RegExp(escapeRegExp(skill.projectName)),
        });
        expect(links.length).toBeGreaterThan(0);
        for (const link of links) {
          expect(link).toHaveAttribute("href", `/projects/${skill.projectSlug}`);
        }
      }
    }
  });

  it("shows no proficiency percentages or skill bars", () => {
    const { container } = render(<Stack />);
    expect(container.querySelector(".bar")).toBeNull();
    expect(within(container).queryByText(/%/)).toBeNull();
  });
});

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
