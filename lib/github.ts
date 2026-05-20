const REPOS = [
  "Jamil1016/portfolio",
  "Jamil1016/local-pipeline",
  "Jamil1016/gmail-scraper",
  "Jamil1016/pipeline-guardian",
  "Jamil1016/data-analyst-reporting-agent",
  "Jamil1016/date-validator",
  "Jamil1016/report-automation",
];

export type RecentCommit = {
  repo: string;
  message: string;
  url: string;
  date: string;
};

export async function recentCommits(): Promise<RecentCommit[]> {
  const results: RecentCommit[] = [];
  for (const repo of REPOS) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/commits?per_page=1`,
        { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } }
      );
      if (!res.ok) continue;
      const data = (await res.json()) as Array<{
        sha: string;
        commit: { message: string; author: { date: string } };
        html_url: string;
      }>;
      if (data[0]) {
        results.push({
          repo,
          message: data[0].commit.message.split("\n")[0].slice(0, 80),
          url: data[0].html_url,
          date: data[0].commit.author.date,
        });
      }
    } catch {
      // ignore individual failures (rate limits, network, repo not yet created)
    }
  }
  return results
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);
}
