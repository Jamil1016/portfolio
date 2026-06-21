import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MobileMenu } from "@/components/home/MobileMenu";

const links = [
  { href: "#hero", label: "Home", tablink: "home" },
  { href: "#work", label: "Work", tablink: "work" },
  { href: "#training", label: "Training", tablink: "training", dot: true },
];
const cta = { href: "#contact", label: "Get in touch" };

function setup() {
  render(<MobileMenu links={links} cta={cta} />);
  return screen.getByRole("button", { name: /open menu/i });
}

describe("MobileMenu", () => {
  it("starts closed", () => {
    const btn = setup();
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the panel with all links and the CTA when the hamburger is clicked", () => {
    const btn = setup();
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("dialog");
    for (const l of links) {
      expect(within(panel).getByRole("link", { name: new RegExp(l.label) })).toBeInTheDocument();
    }
    expect(within(panel).getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("closes when Escape is pressed", () => {
    const btn = setup();
    fireEvent.click(btn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when a nav link is tapped", () => {
    const btn = setup();
    fireEvent.click(btn);
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("link", { name: /work/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
