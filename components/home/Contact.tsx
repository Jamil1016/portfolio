import { AVAILABILITY, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/lib/site-data";

export function Contact() {
  return (
    <section className="contact" id="contact" data-tab="about" data-screen-label="Contact">
      <div className="wrap">
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          <span className="dot" /> Part-time and project work
        </div>
        <h2>
          Got manual work that should <em>run itself?</em>
        </h2>
        <p className="sub">{AVAILABILITY}. Email me what the process looks like today.</p>
        <div className="cta-row">
          <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className="link-u" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          {LINKEDIN_URL && (
            <a className="link-u" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          )}
        </div>
        <div className="docs-row">
          <a className="doc-pill" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume <span>PDF</span>
          </a>
          <a className="doc-pill" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            CV <span>PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}
