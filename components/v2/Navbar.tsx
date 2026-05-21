import Link from "next/link";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
        <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-serif text-sm text-slate-950">
          JM
        </Link>
        <ul className="hidden md:flex items-center gap-1 px-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="rounded-full px-3 py-1.5 text-slate-300 hover:bg-slate-900 hover:text-slate-50 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="mailto:your-personal-email@example.com"
          className="rounded-full bg-cream-200 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-cream-100"
        >
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
