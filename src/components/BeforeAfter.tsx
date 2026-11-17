"use client";

import { MoveHorizontal, Wand2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const STYLES = [
  { id: "clean", label: "Clean & Simple", note: "Clean cuts, a light color fix and easy-to-read captions" },
  { id: "pro", label: "Professional", note: "Speed ramps, zoom punches, whip transitions, color grading and word-by-word animated captions" },
  { id: "cinematic", label: "Premium Cinematic", note: "Film color grade, slow-motion ramps, light leaks, letterbox, grain and story titles" },
] as const;

type StyleId = (typeof STYLES)[number]["id"];

const src = (name: string) => `/samples/travel-${name}.mp4`;

/** Before / after slider: raw footage underneath, the edited version on top. */
export default function BeforeAfter() {
  const [style, setStyle] = useState<StyleId>("pro");
  const [pos, setPos] = useState(50);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const raw = useRef<HTMLVideoElement>(null);
  const edited = useRef<HTMLVideoElement>(null);

  // Load the videos only when the section comes near the screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep both videos on the same frame.
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      const a = raw.current;
      const b = edited.current;
      if (!a || !b || a.readyState < 2 || b.readyState < 2) return;
      if (Math.abs(a.currentTime - b.currentTime) > 0.08) b.currentTime = a.currentTime;
      if (b.paused && !a.paused) b.play().catch(() => {});
    }, 250);
    return () => window.clearInterval(id);
  }, [inView, style]);

  const onPick = (id: StyleId) => {
    setStyle(id);
    const t = raw.current?.currentTime ?? 0;
    requestAnimationFrame(() => {
      if (edited.current) {
        edited.current.currentTime = t;
        edited.current.play().catch(() => {});
      }
    });
  };

  const current = STYLES.find((s) => s.id === style)!;

  return (
    <section id="before-after" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-bright/30 bg-bright/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-bright">
              <Wand2 className="h-3.5 w-3.5" />
              SEE THE DIFFERENCE
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">Raw footage in, scroll-stopping video out</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-mist">
              Drag the line to compare. Then pick a style to see how the same clip changes
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Editing style">
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={style === s.id}
                onClick={() => onPick(s.id)}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  style === s.id
                    ? "border-bright bg-[#2563eb]/25 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div
            ref={box}
            className="relative mt-6 aspect-video w-full select-none overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/50"
          >
            {inView ? (
              <>
                <video
                  ref={raw}
                  src={src("raw")}
                  poster="/samples/travel-poster.jpg"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label="Raw footage before editing"
                />
                <video
                  key={style}
                  ref={edited}
                  src={src(style)}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                  aria-label={`The same clip edited in the ${current.label} style`}
                />
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/samples/travel-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}

            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white sm:left-4 sm:top-4">
              Raw footage
            </span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-bright/80 px-3 py-1 text-xs font-semibold text-white sm:right-4 sm:top-4">
              Edited by us
            </span>

            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
                <MoveHorizontal className="h-5 w-5" />
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare raw and edited video"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          <p className="mt-4 text-center text-sm text-mist">
            <span className="font-semibold text-white">{current.label}:</span> {current.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
