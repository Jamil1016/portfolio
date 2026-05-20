import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, projects } from "@/lib/projects";
import { loadCaseStudy } from "@/lib/content";
import { CaseStudyLayout } from "@/components/case-study/Layout";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const source = await loadCaseStudy(slug);
  if (!source) notFound();

  return (
    <CaseStudyLayout project={project}>
      <MDXRemote source={source} />
    </CaseStudyLayout>
  );
}
