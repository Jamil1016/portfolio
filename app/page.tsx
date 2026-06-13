import "./home.css";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Work } from "@/components/home/Work";
import { Stack } from "@/components/home/Stack";
import { Training } from "@/components/home/Training";
import { Experience } from "@/components/home/Experience";
import { Contact } from "@/components/home/Contact";
import { HomeEffects } from "@/components/home/HomeEffects";

// Learning snapshot is read at request time.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="home-shell">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Work />
        <Stack />
        {/* Server component: fetches the public learning snapshot. */}
        <Training />
        <Experience />
        <Contact />
      </main>

      <footer data-screen-label="Footer">
        <div className="wrap foot">
          <span>© 2026 Jamil Mendez · jamilmendez.dev</span>
          <span>
            <a href="#work">Work</a>
            <a href="#stack">Stack</a>
            <a href="#training">Training</a>
            <a href="#contact">Contact</a>
          </span>
        </div>
      </footer>

      <div className="scroll-hint" id="scroll-hint" aria-hidden="true">
        scroll <span className="ar">↓</span>
      </div>

      <HomeEffects />
    </div>
  );
}
