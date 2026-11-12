/** CSS fallback "D" — layered gradient glass mark, shown if WebGL fails or in low mode.
 * Kept in its own module so importing it never pulls Three.js into the first-load bundle. */
export function CssFallbackD({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      role="img"
      aria-label="DevelopNearly D mark"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-bright/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-full bg-primary/20 blur-2xl"
      />
      <span className="text-gradient-blue relative font-display text-[11rem] font-bold leading-none sm:text-[15rem] lg:text-[19rem]">
        D
      </span>
    </div>
  );
}
