const STATS = [
  { value: "6.2M+", label: "rows / night" },
  { value: "25", label: "tables in production" },
  { value: "99%+", label: "pipeline uptime" },
  { value: "6", label: "systems shipped" },
];

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
      {/* radial glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 10%, rgba(99,102,241,0.18) 0%, rgba(15,23,42,0) 70%)",
        }}
      />

      {/* available pill */}
      <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Available for hire
      </div>

      {/* huge serif headline */}
      <h1 className="font-serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight text-slate-50">
        Operating <br />
        <span className="italic">Intelligence.</span>
      </h1>

      {/* subhead */}
      <p className="mt-8 max-w-2xl text-base md:text-lg text-slate-400 leading-relaxed">
        Data + AI Engineer building production{" "}
        <span className="italic text-slate-200">ETL platforms</span> and{" "}
        <span className="italic text-slate-200">autonomous remediation agents</span> at
        telecom-operations scale.
      </p>

      {/* buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#work"
          className="rounded-full bg-cream-200 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-cream-100 transition-colors"
        >
          View Case Studies →
        </a>
        <a
          href="https://github.com/Jamil1016"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-800 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-700 hover:bg-slate-900 transition-colors"
        >
          GitHub
        </a>
      </div>

      {/* stats row */}
      <div className="mt-20 grid w-full grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="font-serif text-4xl md:text-5xl text-slate-50">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-slate-500">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
