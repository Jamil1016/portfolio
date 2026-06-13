import Link from "next/link";

export function TagPills({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="tagfilter-tags" style={{ marginTop: 4 }}>
      {tags.map((tag) => (
        <Link key={tag} href={`/projects#tag=${tag}`} className="tf-tag">
          {tag}
        </Link>
      ))}
    </div>
  );
}
