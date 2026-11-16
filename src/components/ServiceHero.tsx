"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Choice } from "../data/services";
import { FREE_SAMPLE, REVISIONS, SERVICES, purposeOf } from "../data/services";
import { CssFallbackD } from "./CssFallbackD";
import PayAfterBadge from "./PayAfterBadge";
import { usePerformanceMode } from "./usePerformanceMode";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <CssFallbackD className="h-full w-full" />,
});

/**
 * Hero for a single service: text on the left, the 3D D on the right that
 * turns and drifts as the visitor scrolls, and a soft spotlight that follows
 * the cursor on desktop. Text uses the pure-CSS entrance so it paints at
 * first paint; the WebGL canvas loads after a short delay and only while in view.
 */
export default function ServiceHero({ choice }: { choice: Choice }) {
  const service = choice.service;
  const info = SERVICES[service];
  const purpose = purposeOf(choice);
  const mode = usePerformanceMode();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 30 });
  const d = (s: number) => ({ animationDelay: `${s}s` });

  useEffect(() => {
    const delay = mode === "high" ? 400 : 1800;
    const id = window.setTimeout(() => setCanvasReady(true), delay);
    return () => window.clearTimeout(id);
  }, [mode]);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const motionOn = mode === "high";

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!motionOn) return;
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const chips = [...(service === "video" ? [FREE_SAMPLE] : []), `${REVISIONS} free revisions`, "No upfront payment"];

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden bg-ink pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
      aria-label={`${info.name} at DevelopNearly`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        {motionOn ? (
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(59,130,246,0.14), transparent 60%)` }}
          />
        ) : null}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-8">
        <motion.div style={motionOn ? { y: textY, opacity: textOpacity } : undefined} className="text-center lg:text-left">
          <div style={d(0)} className="mb-5 flex animate-hero-fade-up justify-center lg:justify-start">
            <PayAfterBadge />
          </div>
          <p
            style={d(0.04)}
            className="mb-6 inline-flex animate-hero-fade-up items-center gap-2.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/15 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[#93c5fd]"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            {info.eyebrow}
          </p>
          <h1
            style={d(0.08)}
            className="animate-hero-fade-up font-display text-[clamp(2.5rem,6.6vw,5rem)] font-bold leading-[0.98] tracking-tight text-white"
          >
            {purpose.headline[0]}
            <br />
            {purpose.headline[1]} <span className="text-gradient-blue">{purpose.highlight}</span>
          </h1>
          <p style={d(0.16)} className="mx-auto mt-6 max-w-xl animate-hero-fade-up text-base leading-relaxed text-mist sm:text-lg lg:mx-0">
            {purpose.subhead}
          </p>
          <ul
            style={d(0.24)}
            className="mt-7 flex animate-hero-fade-up flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85 lg:justify-start"
          >
            {chips.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-bright" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>
          <div style={d(0.32)} className="mt-9 flex animate-hero-fade-up flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#packages"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] sm:w-auto"
            >
              See Packages
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
        </motion.div>

        <motion.div
          style={motionOn ? { scale: stageScale } : undefined}
          className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[520px]"
        >
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-primary/25 blur-[90px]" />
          <div aria-hidden="true" className="absolute inset-[4%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-bright/20" />
          <div aria-hidden="true" className="absolute inset-[16%] animate-[spin_28s_linear_infinite_reverse] rounded-full border border-bright/10" />
          <div className="relative h-full w-full">
            {mode === "low" || !(inView && canvasReady) ? <CssFallbackD className="h-full w-full" /> : <HeroCanvas mode={mode} />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
