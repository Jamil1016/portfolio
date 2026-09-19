import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_TAGLINE } from "@/lib/site-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const TITLE = `${SITE_NAME} | ${SITE_TITLE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: SITE_TAGLINE,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_TAGLINE,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE_TAGLINE },
};

// viewport-fit:cover lets the layout extend under the notch; the CSS then pads
// content back in with env(safe-area-inset-*). themeColor tints the browser
// chrome to match each theme's paper background.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4eee1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
};

// Applied before paint so the chosen theme never flashes. Defaults to "cream".
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(!t||['cream','dark','colorful'].indexOf(t)===-1)t='cream';document.documentElement.setAttribute('data-theme',t);if(localStorage.getItem('motion')==='off')document.documentElement.setAttribute('data-motion','off');}catch(e){document.documentElement.setAttribute('data-theme','cream');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
