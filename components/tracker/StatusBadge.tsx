const VARIANTS = {
  not_started: { label: "Not started", className: "bg-slate-800 text-slate-400" },
  in_progress: { label: "In progress", className: "bg-emerald-900/40 text-emerald-300" },
  done:        { label: "Done",        className: "bg-slate-700 text-slate-200" },
};

export function StatusBadge({ status }: { status: keyof typeof VARIANTS }) {
  const v = VARIANTS[status];
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs ${v.className}`}>
      {v.label}
    </span>
  );
}
