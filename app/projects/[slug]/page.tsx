import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import remarkDecisions from "@/lib/remark-decisions";
import { extractHeadings } from "@/lib/toc";
import { getNeighbours, getProjectBySlug, projects } from "@/lib/projects";
import { loadCaseStudy } from "@/lib/content";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import { MermaidDiagram } from "@/components/case-study/MermaidDiagram";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found | Jamil Mendez" };
  const title = `${project.name} | Case study | Jamil Mendez`;
  const url = `/projects/${project.slug}`;
  return {
    title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: project.tagline, url },
    twitter: { card: "summary_large_image", title, description: project.tagline },
  };
}

const mdxComponents = {
  MermaidDiagram,
};

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

  const headings = extractHeadings(source);
  const neighbours = getNeighbours(slug) ?? undefined;

  return (
    <CaseStudyLayout project={project} headings={headings} neighbours={neighbours}>
      {/* blockJS defaults to true in next-mdx-remote 6 and strips the template
          literal that carries each diagram's source. The MDX is first-party
          (content/projects), and blockDangerousJS stays on. */}
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          blockJS: false,
          blockDangerousJS: true,
          mdxOptions: { remarkPlugins: [remarkGfm, remarkDecisions], rehypePlugins: [rehypeSlug] },
        }}
      />
    </CaseStudyLayout>
  );
}
