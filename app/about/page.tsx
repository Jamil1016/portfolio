import Link from "next/link";
export const metadata = { title: "About | Jamil Mendez" };
export default function About() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">← back</Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">About</h1>
      <div className="prose prose-invert prose-slate mt-6">
        <p>
          I&apos;m Jamil Mendez, a Data &amp; AI Automation Engineer. I take the manual,
          repetitive parts of data work, like pulling from APIs, drives, sheets and inboxes,
          cleaning it in Excel, and rebuilding the same reports by hand, and turn them into
          pipelines that run unattended.
        </p>
        <p>
          That instinct has been the through-line of my whole career. I trained as an
          Industrial Engineer and started on the QA floor at Citizen Finedevice,
          automating quality reports with VBA and Power Query. At Emerson (Copeland) I
          moved into demand planning and migrated a manual Excel forecast system into a
          live Power BI dashboard backed by a Python pipeline. Now, at Nanoninth (Ontel),
          I build the company&apos;s data platform end to end, solo.
        </p>
        <p>
          Today that means roughly 14 ETL pipelines feeding a 111-table Supabase
          warehouse, automated reports and dashboards that used to be assembled by hand,
          and tools that reach beyond the data team, like a quoting web app that took
          accounting from 20&ndash;30 quotes a day to more than 100. My main build right
          now is DARA, an agent that lets stakeholders query the warehouse in plain
          language (Claude&nbsp;+&nbsp;MCP), alongside an AI monitor that watches the
          pipelines and diagnoses failures.
        </p>
        <h2>What I&apos;m learning</h2>
        <p>
          My current focus is the <strong>Claude Certified Architect: Foundations
          (CCA-F)</strong> track: each course maps to a real module in a capstone repo, so
          the outcome is shipped artifacts, not just a badge. You can follow the live
          progress on this site.
        </p>
        <ul>
          <li>Now: Claude Certified Architect: Foundations (CCA-F)</li>
          <li>Next: Google Cloud Professional Data Engineer</li>
          <li>Then: dbt Analytics Engineering</li>
        </ul>
      </div>
    </main>
  );
}
