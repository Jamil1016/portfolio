import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <header data-screen-label="Nav">
      <div className="wrap nav">
        <a className="wordmark" href="#hero" data-tablink="home">
          Jamil <em>Mendez.</em>
        </a>
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
          <a href="#training" className="tablink" data-tablink="training">
            Training <span className="mini-dot" />
          </a>
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
