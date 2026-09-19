import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site-data";

/** Shared footer for subpages. The LinkedIn link only renders once a URL is set. */
export function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot">
        <span>© 2026 Jamil Mendez</span>
        <span>
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a href="/about">About</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {LINKEDIN_URL && (
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </span>
      </div>
    </footer>
  );
}
