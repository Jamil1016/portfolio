import { BentoTile } from "./BentoGrid";

export function MetricTile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-xs text-slate-500">PRODUCTION</span>
      </div>
      <p className="mt-3 text-4xl font-semibold text-slate-50">
        6.2M <span className="text-slate-400 text-2xl">rows / night</span>
      </p>
      <p className="mt-1 text-sm text-slate-400">across 25 tables, 99%+ uptime</p>
    </BentoTile>
  );
}
