"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CssFallbackD } from "./CssFallbackD";
import { usePerformanceMode } from "./usePerformanceMode";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <CssFallbackD className="h-full w-full" />,
});

// Hero entrance delays (seconds) mirror the old framer-motion stagger:
// 0.08s apart, matching the 0.6s hero-fade-up CSS animation.
const ENTRANCE_DELAYS = [0, 0.08, 0.16, 0.24, 0.32];

export default function Hero() {
  const mode = usePerformanceMode();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  // Gate the parallax style on mount: the server renders with mode "high"
  // (no window), while a phone client renders "mobile", so applying the
  // scroll-linked style before mount causes a hydration mismatch warning.
  // Server and first client paint both render no style, then parallax
  // switches on after mount on desktop only.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Async so the mount flag flips after first paint (and after hydration),
    // never synchronously inside the effect.
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  // Defer the WebGL canvas until after first paint so the Three.js render
  // loop (and its chunk download) doesn't compete with LCP. The static
  // CssFallbackD stays visible until the canvas mounts. requestIdleCallback
  // with a timeout fallback so it still mounts promptly on busy main
  // threads where idle time is scarce. On touch/low devices the chunk is
  // big for a throttled CPU, so wait longer there (2.5s) to keep the first
  // paint and LCP clear of the Three.js evaluation cost.
  useEffect(() => {
    const delay = mode === "high" ? 600 : 2500;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setCanvasReady(true), { timeout: delay });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(() => setCanvasReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [mode]);

  // Mount the WebGL canvas only while the hero is in view - pauses the
  // render loop when scrolled away (no battery drain, no background rendering).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const parallax = mounted && mode === "high";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink pb-16 pt-32 sm:pt-36 lg:pt-40"
      aria-label="DevelopNearly introduction"
    >
      {/* Cinematic blue lighting / glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Centred hero, Justo-style: eyebrow pill, big two-line headline with
          one word in blue, grey subheading, pill CTAs, then the 3D D in a
          large rounded stage below. The entrance is pure CSS
          (animate-hero-fade-up) so the headline paints at first paint and
          LCP never waits for JS; the inner motion.div only carries the
          scroll parallax on desktop. */}
      <div className="hero-anim relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div style={parallax ? { y: textY } : undefined}>
          <p
            style={{ animationDelay: `${ENTRANCE_DELAYS[0]}s` }}
            className="mb-6 inline-flex animate-hero-fade-up items-center gap-2.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/15 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[#93c5fd]"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            THE DIGITAL AGENCY BUSINESSES LOVE
          </p>

          <h1
            style={{ animationDelay: `${ENTRANCE_DELAYS[1]}s` }}
            className="animate-hero-fade-up font-display text-[clamp(2.9rem,8.5vw,5.9rem)] font-bold leading-[0.98] tracking-tight text-white"
          >
            WE TURN IDEAS
            <br />
            INTO <span className="text-gradient-blue">REALITY</span>
          </h1>

          <p
            style={{ animationDelay: `${ENTRANCE_DELAYS[2]}s` }}
            className="mt-6 animate-hero-fade-up font-display text-xl font-semibold text-white/90 sm:text-2xl"
          >
            Digital Experiences Built to Perform
          </p>

          <p
            style={{ animationDelay: `${ENTRANCE_DELAYS[3]}s` }}
            className="mx-auto mt-4 max-w-xl animate-hero-fade-up text-base leading-relaxed text-mist sm:text-lg"
          >
            We combine creative storytelling, modern web development, and smart AI tools
            to help ambitious businesses build, grow, and reach more customers
          </p>

          <div
            style={{ animationDelay: `${ENTRANCE_DELAYS[4]}s` }}
            className="mt-9 flex animate-hero-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] sm:w-auto"
            >
              Start a Project
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/60 hover:bg-white/10 sm:w-auto"
            >
              <Play className="h-4 w-4 text-bright" />
              Explore Our Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* 3D D stage - real geometry in a large rounded frame, CSS fallback
          in low mode or on WebGL failure. */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={parallax ? { y: canvasY } : undefined}
        className="hero-anim relative z-10 mx-auto mt-14 max-w-3xl px-4 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-panel/60 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px]" />
          <div className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[420px]">
            {mode === "low" ? (
              <CssFallbackD className="relative h-full w-full" />
            ) : inView && canvasReady ? (
              <div className="relative h-full w-full">
                <HeroCanvas mode={mode} />
              </div>
            ) : (
              <CssFallbackD className="relative h-full w-full" />
            )}
          </div>
        </div>
      </motion.div>

      <a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium tracking-[0.2em] text-mist transition-colors hover:text-white lg:inline-flex"
        aria-label="Scroll to services"
      >
        SCROLL
        <span aria-hidden="true" className="block h-8 w-px animate-pulse bg-gradient-to-b from-bright to-transparent" />
      </a>
    </section>
  );
}
