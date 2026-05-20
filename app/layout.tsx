import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Jamil Mendez — Data + AI Engineer",
  description:
    "Engineer building production data pipelines and AI agents. Portfolio, projects, and learning log.",
  metadataBase: new URL("https://jamilmendez.dev"),
  openGraph: {
    title: "Jamil Mendez — Data + AI Engineer",
    description: "Portfolio, projects, and learning log.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
