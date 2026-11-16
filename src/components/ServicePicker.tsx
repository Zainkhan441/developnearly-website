"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clapperboard, Globe, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "../data/services";
import DLogo from "./DLogo";

/**
 * Landing gateway: the first thing a visitor sees is one question, "what do
 * you need?", with one big card per service. Each card leads to its own page
 * (/video or /websites) that only talks about that service, so nobody has to
 * scroll past work they did not come for. Cold emails can link straight to
 * the matching page.
 */

function VideoCardVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Muted showreel loop behind the card, skipped for reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = v.play();
    if (p) p.then(() => setPlaying(true)).catch(() => undefined);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image src="/work/a380.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
      <video
        ref={videoRef}
        src="/work/previews/a380-preview.mp4"
        poster="/work/a380.webp"
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/20" />
      {/* timeline strip */}
      <div className="absolute inset-x-6 top-6 hidden items-end sm:flex gap-1 opacity-70 sm:inset-x-8">
        {[30, 52, 24, 64, 40, 58, 34, 70, 46, 28, 56, 38, 62, 32].map((h, i) => (
          <span key={i} className={`flex-1 rounded-sm ${i % 3 === 0 ? "bg-primary" : "bg-white/25"}`} style={{ height: `${h * 0.35}px` }} />
        ))}
      </div>
    </div>
  );
}

function WebCardVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-panel to-ink" />
      <div className="absolute -right-10 top-8 w-[78%] rotate-[-6deg] overflow-hidden rounded-xl border border-white/15 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-4deg]">
        <Image src="/work/dynamic-gym.webp" alt="" width={1200} height={750} sizes="40vw" className="h-auto w-full" />
      </div>
      <div className="absolute -left-8 top-24 w-[70%] rotate-[5deg] overflow-hidden rounded-xl border border-white/15 shadow-2xl transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[3deg]">
        <Image src="/work/alaska-restaurant.webp" alt="" width={1200} height={750} sizes="40vw" className="h-auto w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/10" />
    </div>
  );
}

const CARDS = [
  {
    info: SERVICES.video,
    icon: Clapperboard,
    question: "I need my videos edited",
    visual: <VideoCardVisual />,
  },
  {
    info: SERVICES.web,
    icon: Globe,
    question: "I need a website",
    visual: <WebCardVisual />,
  },
];

export default function ServicePicker() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-ink">
      {/* Cinematic blue lighting, same as the service pages */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <DLogo withWordmark />
          <a
            href="https://wa.me/923131134962?text=Hi%20DevelopNearly!%20I%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:border-[#25d366]/60"
          >
            <MessageCircle className="h-4 w-4 text-[#25d366]" />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </header>

        <div className="flex flex-1 flex-col justify-center py-10 sm:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 inline-flex animate-hero-fade-up items-center gap-2.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/15 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-[#93c5fd]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              WELCOME TO DEVELOPNEARLY
            </p>
            <h1
              className="animate-hero-fade-up font-display text-[clamp(2.3rem,6vw,4rem)] font-bold leading-[1.02] tracking-tight text-white"
              style={{ animationDelay: "0.08s" }}
            >
              What can we <span className="text-gradient-blue">help you</span> with?
            </h1>
            <p
              className="mx-auto mt-5 max-w-xl animate-hero-fade-up text-base leading-relaxed text-mist sm:text-lg"
              style={{ animationDelay: "0.16s" }}
            >
              Pick the service you need and we will show you only what matters to you
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-2">
            {CARDS.map(({ info, icon: Icon, question, visual }, i) => (
              <Link
                key={info.key}
                href={info.href}
                style={{ animationDelay: `${0.24 + i * 0.08}s` }}
                className="group relative flex min-h-[23rem] animate-hero-fade-up flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-panel p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-bright/60 hover:shadow-[0_30px_80px_rgba(37,99,235,0.28)] focus-visible:outline-2 sm:min-h-[25rem] sm:p-9"
              >
                {visual}
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb] text-white shadow-[0_8px_30px_rgba(37,99,235,0.5)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-bright">{info.name.toUpperCase()}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.1rem]">{question}</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {info.audience.map((a) => (
                      <li key={a} className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm">
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-sm text-mist">
                      Starting from <span className="font-display text-xl font-bold text-white">{info.startingFrom}</span>
                    </p>
                    <span className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink transition-all duration-300 group-hover:bg-[#2563eb] group-hover:text-white">
                      Continue
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-mist">
            Need both a website and videos?{" "}
            <Link href="/websites#contact" className="font-semibold text-bright underline-offset-4 hover:underline">
              Tell us about your project
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
