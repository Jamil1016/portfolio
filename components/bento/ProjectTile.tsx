import Link from "next/link";
import { BentoTile } from "./BentoGrid";
import type { ProjectMeta } from "@/lib/projects";

export function ProjectTile({
  project,
  span = "md:col-span-3 md:row-span-1",
}: {
  project: ProjectMeta;
  span?: string;
}) {
  return (
    <BentoTile span={span}>
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">{project.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs">
            <Link
              href={`/projects/${project.slug}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              Read case study →
            </Link>
            {project.publicRepoStatus === "coming" && project.publicEtaWeek && (
              <span className="font-mono text-slate-500">
                OSS · {project.publicEtaWeek}
              </span>
            )}
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
