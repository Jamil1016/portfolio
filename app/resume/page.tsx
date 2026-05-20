import Link from "next/link";
export const metadata = { title: "Resume — Jamil Mendez" };
export default function Resume() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">← back</Link>
        <a
          href="/resume.pdf"
          className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-300 hover:bg-emerald-900/30"
          download
        >
          Download PDF
        </a>
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">Jamil Mendez</h1>
      <p className="text-slate-400">Data + AI Engineer</p>
      <div className="prose prose-invert prose-slate mt-8 max-w-none">
        <h2>Experience</h2>
        <p>Data + AI Engineering (current role)</p>
        <p>
          Built and operate a production pipeline platform (millions of rows nightly),
          an in-house data analytics agent (DARA), and an auto-remediation agent
          (Pipeline Guardian).
        </p>
        <h2>Selected work</h2>
        <ul>
          <li>Async ETL platform — Python, asyncpg, Postgres, GitHub Actions</li>
          <li>Pipeline Guardian — Claude API, structured tools, runbook-aware</li>
          <li>DARA — FastAPI + Next.js, schema-aware NL→SQL with safety rails</li>
          <li>Gmail document parser — HTML→JSONB with dynamic field discovery</li>
          <li>Cross-source date validator — daily reconciliation over Sheets + Postgres</li>
          <li>Report Automation — Daily Finance Report pipeline</li>
        </ul>
      </div>
    </main>
  );
}
