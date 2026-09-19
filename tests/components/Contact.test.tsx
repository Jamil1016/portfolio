import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Contact } from "@/components/home/Contact";

describe("Contact", () => {
  it("links the Resume download straight to the PDF", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute("href", "/resume.pdf");
    expect(screen.getByRole("link", { name: /^cv/i })).toHaveAttribute("href", "/cv.pdf");
  });

  it("does not offer a public generic cover letter", () => {
    render(<Contact />);
    expect(screen.queryByRole("link", { name: /cover letter/i })).toBeNull();
  });

  it("states availability and hides LinkedIn until a URL is configured", () => {
    render(<Contact />);
    expect(screen.getByText(/about 20 hours a week/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /linkedin/i })).toBeNull();
  });
});
