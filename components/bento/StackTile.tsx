import { BentoTile } from "./BentoGrid";

const STACK = [
  "Python", "TypeScript", "Postgres", "Supabase",
  "Next.js", "Claude API", "GitHub Actions", "dbt (soon)",
];

export function StackTile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-3">STACK</p>
      <div className="flex flex-wrap gap-2">
        {STACK.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </BentoTile>
  );
}
