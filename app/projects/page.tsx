import Link from "next/link";
import { projects } from "@/lib/projects";
import { TagFilter } from "@/components/projects/TagFilter";

export const metadata = { title: "Projects — Jamil Mendez" };

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">
        ← back
      </Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">Projects</h1>
      <p className="mt-2 text-slate-400">Engineering systems that operate themselves.</p>
      <div className="mt-10">
        <TagFilter projects={projects} />
      </div>
    </main>
  );
}
