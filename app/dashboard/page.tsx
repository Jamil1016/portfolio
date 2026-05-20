import { createServerClient } from "@/lib/supabase/server";
import { WeekCard, type WeekRow } from "@/components/tracker/WeekCard";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("learning_weeks")
    .select("*")
    .order("sort_order", { ascending: true });

  const weeks = (data ?? []) as WeekRow[];
  const phases = Array.from(new Set(weeks.map((w) => w.phase)));

  const totalCount = weeks.filter((w) => w.phase !== "Capstone").length;
  const doneCount = weeks.filter((w) => w.status === "done" && w.phase !== "Capstone").length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold text-slate-50">Learning tracker</h1>
        <span className="font-mono text-sm text-slate-400">
          {doneCount} / {totalCount} weeks
        </span>
      </header>

      <div className="mt-8 space-y-10">
        {phases.map((phase) => (
          <section key={phase}>
            <h2 className="font-mono text-xs uppercase tracking-wide text-slate-500">
              {phase}
            </h2>
            <div className="mt-3 space-y-3">
              {weeks
                .filter((w) => w.phase === phase)
                .map((w) => (
                  <WeekCard key={w.id} week={w} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
