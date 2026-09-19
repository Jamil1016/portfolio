import "./home.css";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Work } from "@/components/home/Work";
import { Stack } from "@/components/home/Stack";
import { Experience } from "@/components/home/Experience";
import { Principles } from "@/components/home/Principles";
import { Contact } from "@/components/home/Contact";
import { HomeEffects } from "@/components/home/HomeEffects";

export default function HomePage() {
  return (
    <div className="home-shell">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Work />
        <Stack />
        <Experience />
        <Principles />
        <Contact />
      </main>

      <footer data-screen-label="Footer">
        <div className="wrap foot">
          <span>© 2026 Jamil Mendez</span>
          <span>
            <a href="#work" data-tablink="work">Work</a>
            <a href="#stack" data-tablink="stack">Stack</a>
            <a href="/about">About</a>
            <a href="#contact" data-tablink="about">Contact</a>
          </span>
        </div>
      </footer>

      <HomeEffects />
    </div>
  );
}
