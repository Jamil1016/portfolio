import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata = { title: "Projects — Jamil Mendez" };

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">
        ← back
      </Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">Projects</h1>
      <div className="mt-8 space-y-4">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="block rounded-xl border border-slate-800 p-5 hover:border-slate-700"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-medium text-slate-50">{p.name}</h2>
              {p.publicRepoStatus === "coming" && (
                <span className="font-mono text-xs text-slate-500">
                  OSS · {p.publicEtaWeek}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-400">{p.tagline}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
