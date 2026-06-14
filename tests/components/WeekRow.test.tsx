import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { WeekRow } from "@/components/tracker/WeekRow";

// Mock the server action so the client component renders without a real action.
vi.mock("@/app/dashboard/actions", () => ({
  updateWeekStatus: vi.fn(async () => {}),
}));

const base = {
  id: "abc",
  phase: "Phase 1",
  week_label: "Week 1",
  course_title: "Anthropic Prompt Engineering Tutorial",
  url: "https://example.com",
  time_estimate: "~6 hrs",
  apply_action: "Prompt-rewrite PR with before/after numbers",
  status: "not_started" as const,
  notes: null,
  artifact_url: null,
  objectives: null,
  success_metric: null,
  data_source: null,
  playbook_path: null,
};

describe("WeekRow", () => {
  it("shows week label, course title, and status when collapsed", () => {
    render(<WeekRow week={base} />);
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText(/Anthropic Prompt Engineering Tutorial/)).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });

  it("keeps the panel collapsed by default", () => {
    render(<WeekRow week={{ ...base, objectives: "Messages API; tool use" }} />);
    expect(screen.queryByText(/Messages API/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { expanded: false })).toBeInTheDocument();
  });

  it("reveals Learn/Measure/Data/Ships and links when expanded", () => {
    const w = {
      ...base,
      objectives: "Messages API; tool use; streaming",
      success_metric: "1 DARA call ported, eval ≥ baseline",
      data_source: "DARA prod prompt log",
      playbook_path: "docs/roadmap/phase-0.md#week-0c",
    };
    render(<WeekRow week={w} />);
    fireEvent.click(screen.getByRole("button", { expanded: false }));

    expect(screen.getByText(/Messages API/)).toBeInTheDocument();
    expect(screen.getByText(/eval ≥ baseline/)).toBeInTheDocument();
    expect(screen.getByText(/DARA prod prompt log/)).toBeInTheDocument();
    expect(screen.getByText(/Prompt-rewrite PR/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /full build steps/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open course/i })).toBeInTheDocument();
  });

  it("omits empty fields and the playbook link when expanded with nulls", () => {
    render(<WeekRow week={{ ...base, apply_action: null }} defaultOpen />);
    expect(screen.queryByText("Learn")).not.toBeInTheDocument();
    expect(screen.queryByText("Measure")).not.toBeInTheDocument();
    expect(screen.queryByText("Data")).not.toBeInTheDocument();
    expect(screen.queryByText("Ships")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /full build steps/i })).not.toBeInTheDocument();
  });

  it("renders only the Learn row when just objectives is set", () => {
    render(
      <WeekRow week={{ ...base, apply_action: null, objectives: "Just one objective" }} defaultOpen />,
    );
    expect(screen.getByText("Learn")).toBeInTheDocument();
    expect(screen.getByText(/Just one objective/)).toBeInTheDocument();
    expect(screen.queryByText("Measure")).not.toBeInTheDocument();
    expect(screen.queryByText("Data")).not.toBeInTheDocument();
  });

  it("opens expanded when defaultOpen is set (current focus)", () => {
    render(
      <WeekRow
        week={{ ...base, status: "in_progress", objectives: "Focus objective" }}
        defaultOpen
      />,
    );
    expect(screen.getByText(/Focus objective/)).toBeInTheDocument();
    expect(screen.getByRole("button", { expanded: true })).toBeInTheDocument();
  });
});
