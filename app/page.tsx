import "./home.css";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Work } from "@/components/home/Work";
import { Stack } from "@/components/home/Stack";
// import { Training } from "@/components/home/Training"; // hidden — WIP, re-enable when built out
import { Experience } from "@/components/home/Experience";
import { Principles } from "@/components/home/Principles";
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
        {/* Training section hidden — WIP, re-enable when built out.
            Server component: fetches the public learning snapshot.
        <Training /> */}
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
            {/* <a href="#training" data-tablink="training">Training</a> */}
            <a href="#contact" data-tablink="about">Contact</a>
          </span>
        </div>
      </footer>

      <HomeEffects />
    </div>
  );
}
