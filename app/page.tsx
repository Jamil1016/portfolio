import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroTile } from "@/components/bento/HeroTile";
import { MetricTile } from "@/components/bento/MetricTile";
import { ProjectTile } from "@/components/bento/ProjectTile";
import { NowLearningTile } from "@/components/bento/NowLearningTile";
import { StackTile } from "@/components/bento/StackTile";
import { CTATile } from "@/components/bento/CTATile";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const [flagship, ...rest] = projects;
  return (
    <main>
      <BentoGrid>
        <HeroTile />
        <MetricTile />
        <ProjectTile project={flagship} span="md:col-span-6 md:row-span-1" />
        {rest.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
        <NowLearningTile />
        <StackTile />
        <CTATile />
      </BentoGrid>
    </main>
  );
}
