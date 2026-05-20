import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BentoGrid } from "@/components/bento/BentoGrid";

describe("BentoGrid", () => {
  it("renders children inside a 12-column responsive grid", () => {
    render(
      <BentoGrid>
        <div data-testid="child">x</div>
      </BentoGrid>
    );
    const grid = screen.getByTestId("child").parentElement!;
    expect(grid.className).toContain("grid");
    expect(grid.className).toContain("grid-cols-1");
    expect(grid.className).toContain("md:grid-cols-12");
  });
});
