import type { Metadata } from "next";
import "../home.css";

export const metadata: Metadata = {
  title: "Sign in | Jamil Mendez",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="home-shell">{children}</div>;
}
