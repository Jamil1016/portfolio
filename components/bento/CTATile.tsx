import { BentoTile } from "./BentoGrid";

export function CTATile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-2">OPEN TO</p>
      <p className="text-lg text-slate-50">
        Senior data engineering and AI engineering roles
      </p>
      <div className="mt-4 flex gap-4 text-sm">
        <a
          href="mailto:your-personal-email@example.com"
          className="text-emerald-400 hover:text-emerald-300"
        >
          Email →
        </a>
        <a
          href="https://www.linkedin.com/in/your-handle"
          className="text-emerald-400 hover:text-emerald-300"
        >
          LinkedIn →
        </a>
      </div>
    </BentoTile>
  );
}
