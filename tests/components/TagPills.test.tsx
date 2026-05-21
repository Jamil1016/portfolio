import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TagPills } from "@/components/case-study/TagPills";

describe("TagPills", () => {
  it("renders one pill per tag", () => {
    render(<TagPills tags={["python", "async", "etl"]} />);
    expect(screen.getByText("python")).toBeInTheDocument();
    expect(screen.getByText("async")).toBeInTheDocument();
    expect(screen.getByText("etl")).toBeInTheDocument();
  });

  it("each pill links to the /projects index with the tag in the hash", () => {
    render(<TagPills tags={["python"]} />);
    const link = screen.getByRole("link", { name: "python" });
    expect(link).toHaveAttribute("href", "/projects#tag=python");
  });

  it("renders nothing when tags is empty", () => {
    const { container } = render(<TagPills tags={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
