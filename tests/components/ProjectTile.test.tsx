import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProjectTile } from "@/components/bento/ProjectTile";

describe("ProjectTile", () => {
  const project = {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Auto-remediation agent",
    stack: ["Python", "Claude API"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    prod: "production" as const,
    code: "coming" as const,
    etaWeek: "W8",
    tags: ["python", "claude-api", "agent", "automation"],
  };

  it("renders project name, tagline, and stack badges", () => {
    render(<ProjectTile project={project} />);
    expect(screen.getByText("Pipeline Guardian")).toBeInTheDocument();
    expect(screen.getByText("Auto-remediation agent")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Claude API")).toBeInTheDocument();
  });

  it("shows the open-source ETA when status is coming", () => {
    render(<ProjectTile project={project} />);
    expect(screen.getByText(/W8/)).toBeInTheDocument();
  });

  it("links to the case study page", () => {
    render(<ProjectTile project={project} />);
    const link = screen.getByRole("link", { name: /case study/i });
    expect(link).toHaveAttribute("href", "/projects/pipeline-guardian");
  });
});
