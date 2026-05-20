import { Navbar } from "@/components/v2/Navbar";
import { Hero } from "@/components/v2/Hero";
import { SelectedWorks } from "@/components/v2/SelectedWorks";
import { TechnicalStack } from "@/components/v2/TechnicalStack";
import { ExperienceLog } from "@/components/v2/ExperienceLog";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectedWorks />
        <TechnicalStack />
        <ExperienceLog />
      </main>
    </>
  );
}
