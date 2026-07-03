import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";

const MOBILE_LINKS = [
  { href: "#hero", label: "Home", tablink: "home" },
  { href: "#work", label: "Work", tablink: "work" },
  { href: "#stack", label: "Stack", tablink: "stack" },
  // { href: "#training", label: "Training", tablink: "training", dot: true }, // hidden — WIP
  { href: "#experience", label: "About", tablink: "about" },
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
          {/* Training link hidden — WIP, re-enable when built out.
          <a href="#training" className="tablink" data-tablink="training">
            Training <span className="mini-dot" />
          </a> */}
          <a href="#experience" className="tablink" data-tablink="about">
            About
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
