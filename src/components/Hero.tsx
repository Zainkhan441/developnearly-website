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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const mode = usePerformanceMode();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Defer the WebGL canvas until after first paint so the Three.js render
  // loop (and its chunk download) doesn't compete with LCP. The static
  // CssFallbackD stays visible until the canvas mounts. requestIdleCallback
  // with a 600ms timeout fallback so it still mounts promptly on busy
  // main threads where idle time is scarce.
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setCanvasReady(true), { timeout: 600 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(() => setCanvasReady(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

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
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const parallax = mode === "high";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden bg-ink pt-28 pb-16 lg:pt-20"
      aria-label="DevelopNearly introduction"
    >
      {/* Cinematic blue lighting / glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-4 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={parallax ? { y: textY } : undefined}
          className="hero-anim lg:col-span-7"
        >
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-panel/80 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-bright"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            CREATIVE DIGITAL AGENCY
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.9rem,8.5vw,5.9rem)] font-bold leading-[0.98] tracking-tight text-white"
          >
            WE TURN IDEAS
            <br />
            INTO <span className="text-gradient-blue">REALITY</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-display text-xl font-semibold text-white/90 sm:text-2xl"
          >
            Digital Experiences Built to Perform
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            We combine creative storytelling, modern web development, and smart AI tools
            to help ambitious businesses build, grow, and reach more customers
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)]"
            >
              Start a Project
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/60 hover:bg-white/10"
            >
              <Play className="h-4 w-4 text-bright" />
              Explore Our Work
            </a>
          </motion.div>
        </motion.div>

        {/* 3D D - real geometry; CSS fallback in low mode or on WebGL failure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={parallax ? { y: canvasY } : undefined}
          className="hero-anim relative aspect-square w-full max-w-[420px] justify-self-center lg:col-span-5 lg:max-w-none"
        >
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-primary/25 blur-[90px]" />
          {mode === "low" ? (
            <CssFallbackD className="relative h-full w-full" />
          ) : inView && canvasReady ? (
            <div className="relative h-full w-full">
              <HeroCanvas mode={mode} />
            </div>
          ) : (
            <CssFallbackD className="relative h-full w-full" />
          )}
        </motion.div>
      </div>

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
