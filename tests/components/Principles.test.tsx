import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Principles } from "@/components/home/Principles";

describe("Principles", () => {
  it("renders the three working principles on the home page", () => {
    render(<Principles />);
    expect(screen.getByText(/Three things I optimize for/i)).toBeInTheDocument();
    expect(screen.getByText(/Systems that operate themselves/i)).toBeInTheDocument();
    expect(screen.getByText(/Validate counts as a first-class signal/i)).toBeInTheDocument();
    expect(screen.getByText(/Only count it learned once it ships/i)).toBeInTheDocument();
  });
});
