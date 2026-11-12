"use client";

import { usePerformanceMode } from "./usePerformanceMode";

const ITEMS = ["VIDEO EDITING", "WEB DEVELOPMENT", "AI AUTOMATION", "DIGITAL EXPERIENCES"];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {ITEMS.map((label) => (
        <span key={label} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg font-bold tracking-wide text-white/85 sm:text-2xl">
            {label}
          </span>
          <span aria-hidden="true" className="text-lg text-primary sm:text-2xl">
            •
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const mode = usePerformanceMode();
  const animateClass = mode === "low" ? "" : mode === "mobile" ? "animate-marquee-slow" : "animate-marquee";

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-panel py-5" aria-label="Our services">
      <div className={`flex w-max ${animateClass}`}>
        <Row />
        <Row ariaHidden />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent"
      />
    </div>
  );
}
