import { BentoTile } from "./BentoGrid";

export function HeroTile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-2">
      <div className="flex flex-col h-full justify-between">
        <div>
          <p className="font-mono text-xs text-slate-500 mb-2">JAMIL MENDEZ</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
            Data + AI Engineer
          </h1>
          <p className="mt-4 text-slate-400 max-w-md">
            I build production data systems that operate themselves. Six years across ETL,
            analytics, and AI agents — currently shipping at ONTEL TechOps.
          </p>
        </div>
        <p className="font-mono text-xs text-slate-500">based in the Philippines · open to remote</p>
      </div>
    </BentoTile>
  );
}
