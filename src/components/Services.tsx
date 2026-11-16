"use client";

import { ArrowRight, Check, MonitorSmartphone } from "lucide-react";
import type { ServiceKey } from "../data/services";
import { SERVICES } from "../data/services";
import Reveal from "./Reveal";
import { usePerformanceMode } from "./usePerformanceMode";

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((service) => (
        <li key={service} className="flex items-start gap-2.5 text-sm text-white/85 sm:text-[15px]">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-bright">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {service}
        </li>
      ))}
    </ul>
  );
}

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((benefit) => (
        <li key={benefit} className="flex items-start gap-3 text-base font-medium text-white sm:text-lg">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  );
}

/* ---------- 01 · WEBSITE DEVELOPMENT ---------- */

const WEB_BENEFITS = [
  "A fast website your customers love to use",
  "Your services, prices and contact details in one place",
  "Built to show up on Google and bring in customers",
];

function BrowserVisual() {
  const mode = usePerformanceMode();
  const floatClass = mode === "low" ? "" : "animate-float-soft";
  return (
    <div className="relative aspect-[4/3] w-full" role="img" aria-label="Premium browser window with floating interface elements">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-primary/30 blur-[90px]" />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-white/5 bg-ink/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1.5 text-[11px] text-mist">yourbusiness.com</span>
        </div>
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/2 rounded-full bg-gradient-to-r from-bright to-primary" />
          <div className="h-3 w-3/4 rounded-full bg-white/10" />
          <div className="h-3 w-2/3 rounded-full bg-white/10" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="h-20 rounded-xl bg-gradient-to-br from-primary/40 to-[#1e3a5f]" />
            <div className="h-20 rounded-xl bg-white/5" />
            <div className="h-20 rounded-xl bg-gradient-to-br from-bright/30 to-transparent" />
          </div>
          <div className="flex gap-3 pt-1">
            <span className="inline-flex h-9 items-center rounded-full bg-[#2563eb] px-4 text-xs font-semibold text-white">Get Started</span>
            <span className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-xs font-semibold text-white/80">Learn More</span>
          </div>
        </div>
      </div>
      <div className={`glass absolute -right-2 top-6 flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl sm:-right-4 ${floatClass}`}>
        <MonitorSmartphone className="h-4 w-4 text-bright" />
        <span className="text-xs font-semibold tracking-wider text-white">Responsive Layout</span>
      </div>
    </div>
  );
}

/* ---------- 02 · VIDEO EDITING ---------- */

const VIDEO_BENEFITS = [
  "Stories that keep people watching to the end",
  "Faceless videos, Shorts and Reels in one place",
  "Clean sound and a clear message in every cut",
];

function FilmTimelineVisual() {
  const mode = usePerformanceMode();
  const floatClass = mode === "low" ? "" : "animate-float-soft";
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-panel p-5 sm:p-6" role="img" aria-label="Cinematic film timeline with floating video panels">
      <div aria-hidden="true" className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/25 blur-[80px]" />
      {/* Floating video panels */}
      <div className={`relative mb-4 w-3/4 rounded-2xl border border-white/10 bg-ink/90 p-3 shadow-2xl ${floatClass}`}>
        <div className="flex items-center gap-1.5 pb-2.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e3a5f] via-[#10131c] to-[#0b1e3a] sm:h-28">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-white shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </div>
        <div className="flex items-center gap-1.5 pt-2.5" aria-hidden="true">
          <span className="h-1.5 w-2/3 rounded-full bg-primary" />
          <span className="h-1.5 flex-1 rounded-full bg-white/20" />
        </div>
      </div>
      <div className={`relative ml-auto w-2/3 rounded-2xl border border-white/10 bg-ink/90 p-3 shadow-2xl ${floatClass}`} style={{ animationDelay: "1.4s" }}>
        <div className="flex h-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#7f1d1d] via-[#10131c] to-[#1e1b4b] sm:h-20">
          <span className="font-display text-sm font-bold tracking-widest text-white/90">SHORTS · REELS</span>
        </div>
        <div className="flex items-center gap-1.5 pt-2.5" aria-hidden="true">
          <span className="h-1.5 flex-1 rounded-full bg-primary" />
          <span className="h-1.5 w-8 rounded-full bg-white/20" />
          <span className="h-1.5 w-5 rounded-full bg-white/20" />
        </div>
      </div>
      {/* Film timeline */}
      <div className="relative mt-5 rounded-xl border border-white/10 bg-ink/80 p-3">
        <div className="flex items-end gap-1.5" aria-hidden="true">
          {[42, 68, 34, 82, 56, 74, 48, 90, 60, 38, 70, 52].map((h, i) => (
            <span key={i} className={`flex-1 rounded-sm ${i % 3 === 0 ? "bg-primary" : "bg-white/15"}`} style={{ height: `${h * 0.5}px` }} />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
          <span className="h-1 flex-1 rounded-full bg-white/15">
            <span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-bright to-primary" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- SERVICE OVERVIEW (one service per page) ---------- */

const DETAILS: Record<ServiceKey, { title: string; description: string; benefits: string[]; visual: React.ReactNode }> = {
  web: {
    title: "Websites That Work as Hard as You Do",
    description: "We design and develop modern websites that look great, work fast, and are easy for your customers to use",
    benefits: WEB_BENEFITS,
    visual: <BrowserVisual />,
  },
  video: {
    title: "Stories That Keep People Watching",
    description: "We edit videos built to hold attention, from the first hook to the last second, in the style your audience expects",
    benefits: VIDEO_BENEFITS,
    visual: <FilmTimelineVisual />,
  },
};

export default function Services({ service }: { service: ServiceKey }) {
  const info = SERVICES[service];
  const d = DETAILS[service];
  return (
    <section id="services" aria-label={`What we do: ${info.name}`} className="scroll-mt-24 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            WHAT WE DO
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {d.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-mist sm:text-lg">{d.description}</p>
          <BenefitList items={d.benefits} />
          <ServiceList items={info.services} />
          <a
            href="#packages"
            className="group mt-9 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/60 hover:bg-white/10"
          >
            See packages & prices
            <ArrowRight className="h-4 w-4 text-bright transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
        <Reveal delay={0.1} className="transition-transform duration-500 hover:-translate-y-1.5">
          {d.visual}
        </Reveal>
      </div>
    </section>
  );
}
