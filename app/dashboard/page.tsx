import "../home.css";
import "./dashboard.css";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isAllowedEmail } from "@/lib/auth";
import { SiteHeader } from "@/components/home/SiteHeader";
import { TrackerBoard } from "@/components/tracker/TrackerBoard";
import type { TrackerWeek } from "@/components/tracker/WeekRow";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Dashboard | Jamil Mendez",
  robots: { index: false, follow: false },
};

export default async function Dashboard() {
  const supabase = await createServerClient();

  // Defence in depth: middleware already gates /dashboard, but the page must
  // not depend on the matcher staying correct.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAllowedEmail(user.email ?? "")) redirect("/login?from=/dashboard");

  const { data } = await supabase
    .from("learning_weeks")
    .select("*")
    .order("sort_order", { ascending: true });

  const weeks = (data ?? []) as TrackerWeek[];

  return (
    <div className="home-shell">
      <SiteHeader
        cta={
          <a className="btn ghost" href="/">
            View site ↗
          </a>
        }
      />
      <main>
        <div className="wrap" style={{ paddingBottom: "96px" }}>
          <div className="trk-intro">
            <div className="eyebrow">
              <span className="dot" /> Private · Learning control surface
            </div>
            <h1>Learning tracker</h1>
          </div>
          <TrackerBoard weeks={weeks} />
        </div>
      </main>
    </div>
  );
}
