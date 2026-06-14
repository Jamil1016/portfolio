import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects";

const FEATURED_SLUG = "local-pipeline";
const SECONDARY_SLUGS = ["pipeline-guardian", "data-analyst-reporting-agent"];

export function SelectedWorks() {
  const featured = getProjectBySlug(FEATURED_SLUG);
  const secondary = SECONDARY_SLUGS.map(getProjectBySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof getProjectBySlug>
  >[];
  if (!featured) return null;

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-32">
      <header className="mb-16 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Selected Works
        </p>
        <h2 className="font-serif text-5xl md:text-6xl tracking-tight text-slate-50">
          Engineering systems<br />
          that operate <span className="italic">themselves.</span>
        </h2>
        <p className="mt-4 text-slate-400">
          High-dimensional solutions for complex real-world problems in telecom-operations data.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Featured large card */}
        <Link
          href={`/projects/${featured.slug}`}
          className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-colors hover:border-slate-700"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              backgroundImage:
                "radial-gradient(60% 50% at 50% 30%, rgba(99,102,241,0.10) 0%, rgba(15,23,42,0) 70%)",
            }}
          />
          <div className="relative flex aspect-[16/10] flex-col items-center justify-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
              <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-slate-300" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6M3 17l9-6 9 6" />
              </svg>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Flagship</p>
          </div>
          <div className="relative mt-6">
            <h3 className="font-serif text-3xl text-slate-50">{featured.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{featured.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400"
                >
                  {s}
                </span>
              ))}
            </div>
            {featured.etaWeek && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Open source · {featured.etaWeek}
              </p>
            )}
          </div>
        </Link>

        {/* Two smaller stacked cards on the right */}
        {secondary.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-slate-300" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-slate-50">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-400 line-clamp-2">{p.tagline}</p>
            {p.etaWeek && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                OSS · {p.etaWeek}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
        >
          View all {projects.length} projects →
        </Link>
      </div>
    </section>
  );
}
