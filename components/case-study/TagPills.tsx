import Link from "next/link";

export function TagPills({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/projects#tag=${tag}`}
          className="rounded-md border border-emerald-900/60 bg-emerald-950/30 px-2 py-0.5 text-[11px] font-mono text-emerald-300 hover:border-emerald-700 hover:bg-emerald-900/40 transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
