import { BentoTile } from "./BentoGrid";
import { recentCommits } from "@/lib/github";

export async function GitHubFeedTile() {
  const commits = await recentCommits();
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-3">RECENT COMMITS</p>
      {commits.length === 0 ? (
        <p className="text-sm text-slate-400">No recent activity.</p>
      ) : (
        <ul className="space-y-1.5">
          {commits.map((c) => (
            <li key={c.url} className="truncate text-sm">
              <a href={c.url} target="_blank" rel="noreferrer"
                 className="text-slate-300 hover:text-emerald-300">
                <span className="font-mono text-xs text-slate-500">
                  {c.repo.split("/")[1]}
                </span>
                {": "}
                {c.message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </BentoTile>
  );
}
