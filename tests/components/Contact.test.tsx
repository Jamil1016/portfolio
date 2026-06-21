import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Contact } from "@/components/home/Contact";

describe("Contact", () => {
  it("links the Resume download straight to the PDF, not the old /resume page", () => {
    render(<Contact />);
    const resume = screen.getByRole("link", { name: /resume/i });
    expect(resume).toHaveAttribute("href", "/resume.pdf");
  });

  it("offers the CV and cover letter as downloadable PDFs", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /^cv/i })).toHaveAttribute("href", "/cv.pdf");
    expect(screen.getByRole("link", { name: /cover letter/i })).toHaveAttribute(
      "href",
      "/cover-letter.pdf",
    );
  });
});
