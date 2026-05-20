import { BentoTile } from "./BentoGrid";
import { createServerClient } from "@/lib/supabase/server";

type Row = {
  phase: string;
  week_label: string;
  course_title: string;
  url: string | null;
};

async function fetchNowLearning(): Promise<Row | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  try {
    const supabase = await createServerClient();
    const { data } = await supabase
      .from("v_now_learning")
      .select("phase, week_label, course_title, url")
      .maybeSingle();
    return (data as Row | null) ?? null;
  } catch {
    return null;
  }
}

export async function NowLearningTile() {
  const data = await fetchNowLearning();
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-2">NOW LEARNING</p>
      {data ? (
        <>
          <p className="text-sm text-slate-500">
            {data.phase} · {data.week_label}
          </p>
          <a
            href={data.url || "#"}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-lg text-slate-50 hover:text-emerald-300"
          >
            {data.course_title} →
          </a>
        </>
      ) : (
        <p className="text-lg text-slate-50">Between weeks — planning the next push.</p>
      )}
    </BentoTile>
  );
}
