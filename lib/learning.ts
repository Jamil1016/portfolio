import { createServerClient } from "@/lib/supabase/server";

export type LearningStatus = "not_started" | "in_progress" | "done";

export type PublicWeek = {
  phase: string;
  week_label: string;
  course_title: string;
  url: string | null;
  status: LearningStatus;
  sort_order: number;
  started_at: string | null;
  completed_at: string | null;
};

export type LearningSnapshot = {
  weeks: PublicWeek[];
  now: PublicWeek | null;
  totalCount: number; // excludes Capstone phase, like the dashboard
  doneCount: number;
  nowIndex: number | null; // 1-based position of the current week among counted weeks
};

const EMPTY: LearningSnapshot = {
  weeks: [],
  now: null,
  totalCount: 0,
  doneCount: 0,
  nowIndex: null,
};

function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Public learning snapshot for the home page.
 * Reads the anon-granted v_learning_public view. Degrades to an empty
 * snapshot if env/view are absent so the page still renders.
 */
export async function fetchLearningSnapshot(): Promise<LearningSnapshot> {
  if (!hasSupabaseEnv()) return EMPTY;
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("v_learning_public")
      .select("phase, week_label, course_title, url, status, sort_order, started_at, completed_at")
      .order("sort_order", { ascending: true });

    if (error || !data) return EMPTY;

    const weeks = data as PublicWeek[];
    const counted = weeks.filter((w) => w.phase !== "Capstone");
    const doneCount = counted.filter((w) => w.status === "done").length;
    const now = weeks.find((w) => w.status === "in_progress") ?? null;
    const nowIndex = now
      ? counted.findIndex((w) => w.sort_order === now.sort_order) + 1 || null
      : null;

    return {
      weeks,
      now,
      totalCount: counted.length,
      doneCount,
      nowIndex,
    };
  } catch {
    return EMPTY;
  }
}

// Maps a week status to a study-log heat level (0–4).
export function statusLevel(status: LearningStatus): number {
  if (status === "done") return 4;
  if (status === "in_progress") return 2;
  return 0;
}
