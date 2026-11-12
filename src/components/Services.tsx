"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MonitorSmartphone } from "lucide-react";
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

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
      <span aria-hidden="true" className="h-px w-8 bg-primary" />
      {children}
    </p>
  );
}

/* ---------- 04 · VIDEO EDITING ---------- */

const VIDEO_SERVICES = [
  "YouTube Video Editing",
  "Documentary Editing",
  "YouTube Shorts",
  "Reels",
  "Motion Graphics",
  "Cinematic Storytelling",
  "Sound Design",
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
        <p className="pt-2.5 font-display text-xs font-semibold tracking-wide text-white/90">DOCUMENTARY</p>
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

/* ---------- 05 · WEBSITE DEVELOPMENT ---------- */

const WEB_SERVICES = [
  "Business Websites",
  "E-commerce Websites",
  "Landing Pages",
  "Portfolio Websites",
  "Web Applications",
  "Admin Dashboards",
  "Custom Website Development",
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
            <span className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-xs font-semibold text-white">Get Started</span>
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

/* ---------- 06 · AI & AUTOMATION ---------- */

const AI_SERVICES = [
  "AI Chatbots",
  "Workflow Automation",
  "AI Customer Support",
  "Lead Management Automation",
  "AI-powered Business Tools",
  "Custom AI Integrations",
];

function NodeNetworkVisual() {
  const mode = usePerformanceMode();
  const pulse = mode === "low" ? "" : "animate-node-pulse";
  const nodes = [
    { x: 60, y: 50, r: 9, label: "AI" },
    { x: 170, y: 28, r: 6, label: "" },
    { x: 280, y: 60, r: 7, label: "" },
    { x: 110, y: 140, r: 6, label: "" },
    { x: 220, y: 150, r: 8, label: "" },
    { x: 320, y: 130, r: 5, label: "" },
    { x: 70, y: 220, r: 6, label: "" },
    { x: 180, y: 230, r: 7, label: "" },
    { x: 300, y: 220, r: 9, label: "" },
  ];
  const edges: Array<[number, number]> = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8], [0, 4], [2, 4]];
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-panel p-4" role="img" aria-label="Animated network of connected AI automation nodes">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[80px]" />
      <svg viewBox="0 0 380 270" className="relative h-full w-full" aria-hidden="true">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(96,165,250,0.35)"
            strokeWidth="1.2"
            className={pulse}
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 7} fill="rgba(59,130,246,0.12)" />
            <circle cx={n.x} cy={n.y} r={n.r} fill={i === 0 ? "#3b82f6" : "#10131c"} stroke="#60a5fa" strokeWidth="1.5" />
            {n.label ? (
              <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">
                {n.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-4 py-3 sm:left-6 sm:right-auto sm:gap-8">
        <div>
          <p className="text-[10px] font-semibold tracking-widest text-mist">AUTOMATED TASKS</p>
          <p className="font-display text-lg font-bold text-white">Hands-free</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live
        </span>
      </div>
    </div>
  );
}

/* ---------- COMPOSED SECTIONS ---------- */

interface ServiceSectionProps {
  id: string;
  label: string;
  title: string;
  description: string;
  services: string[];
  cta: string;
  visual: React.ReactNode;
  flip?: boolean;
}

function ServiceSection({ id, label, title, description, services, cta, visual, flip }: ServiceSectionProps) {
  return (
    <article id={id} className="scroll-mt-24">
      <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "" : ""}`}>
        <Reveal className={flip ? "lg:order-2" : ""}>
          <SectionLabel>{label}</SectionLabel>
          <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {title}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-mist sm:text-lg">{description}</p>
          <ServiceList items={services} />
          <a
            href="#contact"
            className="group mt-9 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/60 hover:bg-white/10"
          >
            {cta}
            <ArrowRight className="h-4 w-4 text-bright transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
        <Reveal delay={0.12} className={flip ? "lg:order-1" : ""}>
          <motion.div
            whileHover={undefined}
            className="transition-transform duration-500 hover:-translate-y-1.5"
          >
            {visual}
          </motion.div>
        </Reveal>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <div id="services" className="scroll-mt-24">
      <section aria-label="Video editing services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <ServiceSection
          id="video-editing"
          label="01 — VIDEO EDITING"
          title="Stories That Keep People Watching."
          description="We create engaging video content designed to capture attention, communicate ideas, and keep audiences connected."
          services={VIDEO_SERVICES}
          cta="Explore Video Services"
          visual={<FilmTimelineVisual />}
        />
      </section>

      <section aria-label="Website development services" className="border-t border-white/5 bg-panel/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <ServiceSection
            id="web-development"
            label="02 — WEBSITE DEVELOPMENT"
            title="Digital Experiences Built to Perform."
            description="We design and develop modern websites that combine beautiful design, powerful functionality, and seamless user experiences."
            services={WEB_SERVICES}
            cta="Explore Web Development"
            visual={<BrowserVisual />}
            flip
          />
        </div>
      </section>

      <section aria-label="AI and automation services" className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <ServiceSection
            id="ai-automation"
            label="03 — AI & AUTOMATION"
            title="Smarter Systems. Better Business."
            description="We help businesses simplify operations and unlock new possibilities through intelligent AI solutions and automation."
            services={AI_SERVICES}
            cta="Explore AI Solutions"
            visual={<NodeNetworkVisual />}
          />
        </div>
      </section>
    </div>
  );
}
