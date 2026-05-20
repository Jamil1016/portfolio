import type { ProjectMeta } from "@/lib/projects";
import Link from "next/link";

export function CaseStudyLayout({
  project,
  children,
}: {
  project: ProjectMeta;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">
        ← back to home
      </Link>
      <header className="mt-8 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50">
          {project.name}
        </h1>
        <p className="mt-2 text-lg text-slate-400">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-800 px-2 py-0.5 text-xs text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>
        {project.publicRepoStatus === "coming" && (
          <p className="mt-4 font-mono text-xs text-slate-500">
            Open-source reference implementation coming {project.publicEtaWeek}
          </p>
        )}
      </header>
      <div className="prose prose-invert prose-slate mt-8 max-w-none">
        {children}
      </div>
    </article>
  );
}
