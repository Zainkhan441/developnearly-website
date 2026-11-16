import { ArrowRight, Check, Play } from "lucide-react";
import type { Choice } from "../data/services";
import { REVISIONS, SERVICES, purposeOf } from "../data/services";

/**
 * Hero for a single service page. Pure CSS entrance (animate-hero-fade-up)
 * so the headline paints at first paint and LCP never waits for JS.
 */
export default function ServiceHero({ choice }: { choice: Choice }) {
  const service = choice.service;
  const info = SERVICES[service];
  const purpose = purposeOf(choice);
  const d = (s: number) => ({ animationDelay: `${s}s` });
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ink pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pt-44"
      aria-label={`${info.name} at DevelopNearly`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p
          style={d(0)}
          className="mb-6 inline-flex animate-hero-fade-up items-center gap-2.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/15 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[#93c5fd]"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
          {info.eyebrow}
        </p>

        <h1
          style={d(0.08)}
          className="animate-hero-fade-up font-display text-[clamp(2.5rem,7.5vw,5.4rem)] font-bold leading-[0.98] tracking-tight text-white"
        >
          {purpose.headline[0]}
          <br />
          {purpose.headline[1]} <span className="text-gradient-blue">{purpose.highlight}</span>
        </h1>

        <p style={d(0.16)} className="mx-auto mt-6 max-w-2xl animate-hero-fade-up text-base leading-relaxed text-mist sm:text-lg">
          {purpose.subhead}
        </p>

        <ul style={d(0.24)} className="mt-7 flex animate-hero-fade-up flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
          {[`${REVISIONS} free revisions`, "Fixed price, no surprises", "Delivered on time"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-bright" strokeWidth={3} />
              {t}
            </li>
          ))}
        </ul>

        <div style={d(0.32)} className="mt-9 flex animate-hero-fade-up flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#packages"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] sm:w-auto"
          >
            See Your Packages
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/60 hover:bg-white/10 sm:w-auto"
          >
            <Play className="h-4 w-4 text-bright" />
            {service === "video" ? "Watch Our Edits" : "See Our Websites"}
          </a>
        </div>
      </div>
    </section>
  );
}
