import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { WeekCard } from "@/components/tracker/WeekCard";

// Mock the server action so the client component can render without a real action
vi.mock("@/app/dashboard/actions", () => ({
  updateWeekStatus: vi.fn(async () => {}),
}));

describe("WeekCard", () => {
  const week = {
    id: "abc",
    phase: "Phase 1",
    week_label: "Week 1",
    course_title: "Anthropic Prompt Engineering Tutorial",
    url: "https://example.com",
    time_estimate: "~6 hrs",
    apply_action: "Rewrite DARA's prompt",
    status: "not_started" as const,
    notes: null,
    artifact_url: null,
    objectives: null,
    success_metric: null,
    data_source: null,
    playbook_path: null,
  };

  it("renders week label, course title, and status badge", () => {
    render(<WeekCard week={week} />);
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText(/Anthropic Prompt Engineering Tutorial/)).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });

  it("shows the time estimate and apply action", () => {
    render(<WeekCard week={week} />);
    expect(screen.getByText(/~6 hrs/)).toBeInTheDocument();
    expect(screen.getByText(/Rewrite DARA/)).toBeInTheDocument();
  });

  it("renders learn objectives, success metric, data source, and playbook link", () => {
    const enriched = {
      ...week,
      objectives: "Messages API; tool use; streaming",
      success_metric: "1 DARA call ported, eval ≥ baseline",
      data_source: "DARA prod prompt log",
      playbook_path: "docs/roadmap/phase-0.md#week-0c",
    };
    render(<WeekCard week={enriched} />);
    expect(screen.getByText(/Messages API/)).toBeInTheDocument();
    expect(screen.getByText(/eval ≥ baseline/)).toBeInTheDocument();
    expect(screen.getByText(/DARA prod prompt log/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /full build steps/i })).toBeInTheDocument();
  });

  it("hides Learn/Measure/Data block, Ships line, and playbook link when those fields are null", () => {
    const bare = {
      ...week,
      apply_action: null,
      objectives: null,
      success_metric: null,
      data_source: null,
      playbook_path: null,
    };
    render(<WeekCard week={bare} />);
    expect(screen.queryByText("Learn")).not.toBeInTheDocument();
    expect(screen.queryByText("Measure")).not.toBeInTheDocument();
    expect(screen.queryByText("Data")).not.toBeInTheDocument();
    expect(screen.queryByText("Ships")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /full build steps/i })).not.toBeInTheDocument();
  });

  it("renders only the Learn row when just objectives is set", () => {
    const partial = {
      ...week,
      objectives: "Just one objective here",
      success_metric: null,
      data_source: null,
    };
    render(<WeekCard week={partial} />);
    expect(screen.getByText("Learn")).toBeInTheDocument();
    expect(screen.getByText(/Just one objective here/)).toBeInTheDocument();
    expect(screen.queryByText("Measure")).not.toBeInTheDocument();
    expect(screen.queryByText("Data")).not.toBeInTheDocument();
  });
});
