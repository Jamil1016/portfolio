import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { RESUME_URL } from "@/lib/site-data";

const MOBILE_LINKS = [
  { href: "#hero", label: "Home", tablink: "home" },
  { href: "#work", label: "Work", tablink: "work" },
  { href: "#stack", label: "Stack", tablink: "stack" },
  { href: "#experience", label: "Experience", tablink: "about" },
  { href: "/about", label: "About" },
  { href: RESUME_URL, label: "Resume" },
];

export function Nav() {
  return (
    <header data-screen-label="Nav">
      <div className="wrap nav">
        <a className="wordmark" href="#hero" data-tablink="home">
          Jamil <em>Mendez.</em>
        </a>
        <MobileMenu links={MOBILE_LINKS} cta={{ href: "#contact", label: "Get in touch" }} />
        <nav className="nav-links">
          <a href="#hero" className="tablink" data-tablink="home">
            Home
          </a>
          <a href="#work" className="tablink" data-tablink="work">
            Work
          </a>
          <a href="#stack" className="tablink" data-tablink="stack">
            Stack
          </a>
          <a href="#experience" className="tablink" data-tablink="about">
            Experience
          </a>
          <a href="/about">About</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <ThemeToggle />
          <a className="btn" href="#contact" data-tablink="about">
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
