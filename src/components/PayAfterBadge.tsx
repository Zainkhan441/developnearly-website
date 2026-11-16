import { ShieldCheck } from "lucide-react";

/** The headline promise: no money upfront, pay once the work is delivered. */
export default function PayAfterBadge({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.25)] ${className}`}
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
      <span>
        Our promise: <span className="text-white">you pay only after the work is done</span>
      </span>
    </p>
  );
}
