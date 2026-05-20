import Link from "next/link";
export const metadata = { title: "About — Jamil Mendez" };
export default function About() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">← back</Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">About</h1>
      <div className="prose prose-invert prose-slate mt-6">
        <p>
          I&apos;m Jamil Mendez — a data and AI engineer. I build the systems that turn
          operational telemetry into measurable, debuggable, and mostly self-healing
          pipelines.
        </p>
        <p>
          Most of my last two years has been spent on three things: making nightly ETL
          fast and observable, building AI agents that wrap internal data the way a
          senior analyst would, and removing the kinds of recurring incidents that
          turn into 2 AM Slack threads.
        </p>
        <h2>Trajectory</h2>
        <p>
          Data Analyst / Engineer → Senior Data Engineer → Data Platform / AI Engineering Lead.
        </p>
        <h2>In progress</h2>
        <ul>
          <li>Google Cloud Professional Data Engineer (target Q3 2026)</li>
          <li>dbt Analytics Engineering Certification</li>
          <li>13-week AI Engineer learning path (track on this site)</li>
        </ul>
      </div>
    </main>
  );
}
