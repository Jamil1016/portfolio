import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl mx-auto px-4 py-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoTile({
  children,
  span = "md:col-span-3 md:row-span-1",
  className,
}: {
  children: React.ReactNode;
  span?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/50 p-6",
        "backdrop-blur transition-colors hover:border-slate-700",
        span,
        className
      )}
    >
      {children}
    </div>
  );
}
