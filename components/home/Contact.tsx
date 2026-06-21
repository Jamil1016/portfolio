import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/site-data";

export function Contact() {
  return (
    <section className="contact" id="contact" data-tab="about" data-screen-label="Contact">
      <div className="wrap">
        <div className="eyebrow" style={{ justifyContent: "center" }}>
          <span className="dot" /> Open to AI / Data Engineer roles
        </div>
        <h2>
          Got a role in <em>mind?</em>
        </h2>
        <p className="sub">
          If you need data systems that run unattended, or an engineer who ships them,
          let&rsquo;s talk.
        </p>
        <div className="cta-row">
          <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className="link-u" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
        <div className="docs-row">
          <a className="doc-pill" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume <span>PDF</span>
          </a>
          <a className="doc-pill" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            CV <span>PDF</span>
          </a>
          <a className="doc-pill" href="/cover-letter.pdf" target="_blank" rel="noopener noreferrer">
            Cover letter <span>PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}
