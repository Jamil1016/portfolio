type Skill = { name: string; level: number };

const COLUMNS: { title: string; iconLabel: string; skills: Skill[] }[] = [
  {
    title: "Data & Pipelines",
    iconLabel: "data",
    skills: [
      { name: "Python", level: 95 },
      { name: "PostgreSQL", level: 92 },
      { name: "asyncpg", level: 88 },
      { name: "Supabase", level: 85 },
      { name: "dbt", level: 60 },
    ],
  },
  {
    title: "AI & Orchestration",
    iconLabel: "ai",
    skills: [
      { name: "Claude API", level: 88 },
      { name: "GitHub Actions", level: 95 },
      { name: "FastAPI", level: 82 },
      { name: "Next.js", level: 75 },
    ],
  },
];

export function TechnicalStack() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-32">
      <header className="mb-16 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Technical Stack
        </p>
        <h2 className="font-serif text-5xl md:text-6xl tracking-tight text-slate-50">
          Tools of <span className="italic">the trade.</span>
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              {col.title}
            </p>
            <ul className="space-y-5">
              {col.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm text-slate-200">{skill.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cream-200 to-cream-400"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
