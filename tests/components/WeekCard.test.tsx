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
});
