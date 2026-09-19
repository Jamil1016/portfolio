import type { Metadata } from "next";
import "../home.css";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { AVAILABILITY, CONTACT_EMAIL, EXPERIENCE_LINE, RESUME_URL } from "@/lib/site-data";

const DESCRIPTION =
  "Jamil Mendez is a Data & AI Automation Engineer in the Philippines with 5+ years automating manual work: ETL pipelines, scheduled reports, internal tools and LLM agents.";

export const metadata: Metadata = {
  title: "About | Jamil Mendez",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Jamil Mendez", description: DESCRIPTION, url: "/about" },
};

export default function About() {
  return (
    <div className="home-shell">
      <SiteHeader />
      <main>
        <section className="page-intro">
          <div className="wrap">
            <div className="eyebrow">About · {EXPERIENCE_LINE}</div>
            <h1>About.</h1>
            <p className="sub">{AVAILABILITY}.</p>
          </div>
        </section>

        <article className="cs-wrap">
          <div className="cs-prose">
            <p>
              I&apos;m Jamil Mendez, a Data &amp; AI Automation Engineer based in the
              Philippines, with {EXPERIENCE_LINE.toLowerCase()}. I take the repetitive parts
              of data work, like pulling from APIs, drives, sheets and inboxes, cleaning it
              in Excel, and rebuilding the same reports by hand, and turn them into pipelines
              that run unattended.
            </p>
            <p>
              Automation has been the constant across three different jobs. I trained as an
              Industrial Engineer and started as a QA Engineer at Citizen Finedevice,
              automating quality reports with VBA and Power Query (87.5% less reporting
              time). At Emerson (Copeland) I worked in demand planning and moved a manual
              Excel forecast tracker into a live Power BI dashboard fed by a Python script.
              Since 2025 I have been at Nanoninth (Ontel), hired as a Data Analyst and doing
              data and AI automation engineering: I build the company&apos;s data platform
              end to end, solo.
            </p>
            <p>
              Today that means about 14 scheduled pipelines feeding a warehouse of 12.2M+
              rows across 111 tables, reports and dashboards that used to be assembled by
              hand, and internal tools for other departments, like a quoting web app that
              took accounting from 20-30 quotes a day to over 100. On the AI side I run an
              email-driven agent that diagnoses failed pipeline runs and asks for approval
              before it changes anything, and I am building DARA, a natural-language
              reporting agent over the warehouse.
            </p>

            <h2>How I work</h2>
            <p>
              I build with Claude Code as a pair programmer. The design is mine, I review
              every change before it lands, and the tests and evals I write decide what
              ships.
            </p>

            <h2>Availability</h2>
            <p>
              I am staying in my current job. {AVAILABILITY}. Email is the best way to reach
              me: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. My resume is{" "}
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                here (PDF)
              </a>
              .
            </p>

            <h2>What I&apos;m learning</h2>
            <ul>
              <li>Now: Google Cloud Associate Cloud Engineer (ACE)</li>
              <li>Next: dbt</li>
              <li>Then: Google Cloud Professional Data Engineer (PDE)</li>
            </ul>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
