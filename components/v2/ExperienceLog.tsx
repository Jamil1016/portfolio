type Entry = { range: string; role: string; description: string; current?: boolean };

const ENTRIES: Entry[] = [
  {
    range: "2024 – Present",
    role: "Data + AI Engineer",
    description:
      "Build and operate the team's data platform: nightly ETL (6.2M+ rows), an in-house NL→SQL analytics agent (DARA), and the auto-remediation pipeline guardian. Cut incident-class on-call burden by an order of magnitude.",
    current: true,
  },
  {
    range: "2022 – 2024",
    role: "Data Analyst",
    description:
      "Owned ad-hoc reporting and led the analytics-schema rebuild that became the foundation for the current platform.",
  },
];

export function ExperienceLog() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-32">
      <header className="mb-16 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Experience Log
        </p>
        <h2 className="font-serif text-5xl md:text-6xl tracking-tight text-slate-50">
          A working <span className="italic">trajectory.</span>
        </h2>
      </header>

      <ol className="space-y-12">
        {ENTRIES.map((entry, idx) => (
          <li key={idx} className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]">
            <div className="flex items-baseline gap-3">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {entry.range}
              </p>
              {entry.current && (
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="font-serif text-2xl text-slate-50">{entry.role}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
