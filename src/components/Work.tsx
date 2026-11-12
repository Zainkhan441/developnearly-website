"use client";

import { ArrowUpRight, Film, Globe } from "lucide-react";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

/** Original CSS/SVG mockup thumbnail — a visual mockup of the real project, never a screenshot claim. */
function SceneArt({ slug, accent }: { slug: string; accent: string }) {
  if (slug === "a380") {
    return (
      <svg viewBox="0 0 200 90" className="h-24 w-48 sm:h-28 sm:w-56" aria-hidden="true">
        <polygon points="28,40 40,12 52,40" fill={accent} opacity="0.85" />
        <polygon points="84,56 112,82 126,56" fill="#ffffff" opacity="0.18" />
        <polygon points="150,56 164,72 172,56" fill="#ffffff" opacity="0.14" />
        <rect x="24" y="38" width="152" height="18" rx="9" fill={accent} opacity="0.32" stroke={accent} strokeWidth="1.5" />
        <circle cx="52" cy="62" r="5" fill="#0b1220" stroke={accent} strokeWidth="1.5" />
        <circle cx="128" cy="62" r="5" fill="#0b1220" stroke={accent} strokeWidth="1.5" />
        {[60, 76, 92, 108, 124, 140].map((x) => (
          <circle key={x} cx={x} cy="47" r="1.8" fill="#ffffff" opacity="0.75" />
        ))}
      </svg>
    );
  }
  if (slug === "tesla-airless-tire") {
    return (
      <svg viewBox="0 0 120 120" className="h-24 w-24 sm:h-28 sm:w-28" aria-hidden="true">
        <circle cx="60" cy="60" r="46" fill="none" stroke={accent} strokeWidth="13" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="13" strokeDasharray="3 9" />
        <circle cx="60" cy="60" r="27" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="2" />
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={60 + Math.cos(rad) * 12}
              y1={60 + Math.sin(rad) * 12}
              x2={60 + Math.cos(rad) * 26}
              y2={60 + Math.sin(rad) * 26}
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="60" cy="60" r="11" fill={accent} />
        <circle cx="60" cy="60" r="4" fill="#0b1220" />
      </svg>
    );
  }
  // knives-edc: diagonal pocket knife illustration
  return (
    <svg viewBox="0 0 200 80" className="h-20 w-48 sm:h-24 sm:w-56" aria-hidden="true">
      <g transform="rotate(-24 100 40)">
        <polygon points="8,32 118,32 148,40 118,48 8,48" fill="#ffffff" opacity="0.28" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
        <polygon points="8,32 118,32 148,40 118,48 8,48" fill={accent} opacity="0.18" />
        <rect x="148" y="30" width="44" height="20" rx="7" fill={accent} />
        <circle cx="152" cy="40" r="3.5" fill="#0b1220" />
        <line x1="160" y1="34" x2="184" y2="34" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="160" y1="46" x2="184" y2="46" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function MockupThumb({ project }: { project: Project }) {
  if (project.kind === "video") {
    return (
      <div
        className="relative flex aspect-[16/10] flex-col overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.accentSoft} 0%, #10131c 70%)` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(circle at 70% 20%, ${project.accent}55, transparent 55%)` }}
        />
        {/* storyboard strip */}
        <div className="relative z-10 flex gap-2 px-4 pt-4" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-9 flex-1 rounded-md border border-white/15 sm:h-11"
              style={{ background: `linear-gradient(135deg, ${project.accent}${i === 1 ? "66" : "33"}, rgba(255,255,255,0.04))` }}
            />
          ))}
        </div>
        {/* scene illustration + play */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <SceneArt slug={project.slug} accent={project.accent} />
          <span className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Film className="h-6 w-6" />
          </span>
        </div>
        <span className="relative z-10 px-4 pb-1 font-display text-xs font-bold tracking-[0.14em] text-white sm:text-sm">
          {project.mockupLabel}
        </span>
        <span aria-hidden="true" className="relative z-10 mx-4 mb-4 mt-2 h-1 rounded-full bg-white/20">
          <span className="block h-full w-1/3 rounded-full" style={{ background: project.accent }} />
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold tracking-wider text-white">
          DOCUMENTARY
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-panel p-4 sm:p-5">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 h-3 flex-1 rounded bg-white/5" />
        </div>
        {/* mini site nav */}
        <div className="flex items-center gap-2 px-4 pt-3">
          <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: project.accent }} />
          <span className="h-2 w-10 rounded-full bg-white/30" />
          <span className="ml-auto flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-7 rounded-full bg-white/15" />
            <span className="h-2 w-7 rounded-full bg-white/15" />
            <span className="h-2 w-7 rounded-full bg-white/15" />
          </span>
        </div>
        {/* hero block */}
        <div
          className="relative mx-4 mt-3 flex min-h-0 flex-1 flex-col justify-center gap-1.5 overflow-hidden rounded-lg px-3 py-2"
          style={{ background: `linear-gradient(120deg, ${project.accentSoft} 0%, ${project.accent}59 62%, #10131c 100%)` }}
        >
          <span className="h-2.5 w-2/3 rounded-full bg-white/85" />
          <span className="h-2 w-1/2 rounded-full bg-white/50" />
          <span
            className="mt-1 inline-flex h-5 w-16 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: project.accent }}
          >
            VISIT SITE
          </span>
        </div>
        {/* feature tiles */}
        <div className="grid shrink-0 grid-cols-3 gap-2 px-4 pb-4 pt-3" aria-hidden="true">
          <span className="flex h-10 flex-col justify-center gap-1 rounded-md border border-white/10 bg-white/5 p-1.5 sm:h-12">
            <span className="h-1.5 w-3/4 rounded-full" style={{ background: project.accent }} />
            <span className="h-1.5 w-1/2 rounded-full bg-white/20" />
          </span>
          <span className="flex h-10 flex-col justify-center gap-1 rounded-md border border-white/10 bg-white/5 p-1.5 sm:h-12">
            <span className="h-1.5 w-2/3 rounded-full bg-white/25" />
            <span className="h-1.5 w-3/4 rounded-full bg-white/20" />
          </span>
          <span className="flex h-10 flex-col justify-center gap-1 rounded-md border border-white/10 p-1.5 sm:h-12" style={{ background: `${project.accent}26` }}>
            <span className="h-1.5 w-3/4 rounded-full" style={{ background: project.accent }} />
            <span className="h-1.5 w-1/2 rounded-full bg-white/20" />
          </span>
        </div>
      </div>
      <span className="absolute bottom-3 left-3 font-display text-xs font-bold tracking-[0.14em] text-white/90 sm:text-sm">
        {project.mockupLabel}
      </span>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" aria-label="Selected work" className="scroll-mt-24 border-t border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
                <span aria-hidden="true" className="h-px w-8 bg-primary" />
                OUR WORK
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Selected Work.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                A selection of projects demonstrating our creative and technical capabilities.
              </p>
            </div>
            <p className="text-sm text-mist">
              <span className="font-semibold text-white">5 websites</span> ·{" "}
              <span className="font-semibold text-white">3 videos</span>
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08} className={project.span}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-ink transition-all duration-500 hover:-translate-y-1.5 hover:border-bright/50 hover:shadow-[0_24px_60px_rgba(59,130,246,0.18)]"
                aria-label={`${project.title} — ${project.category} (opens in a new tab)`}
              >
                <div className="overflow-hidden">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <MockupThumb project={project} />
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-bright">{project.category.toUpperCase()}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{project.description}</p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="flex items-center gap-2 text-sm text-mist">
            <Globe className="h-4 w-4 text-bright" />
            Thumbnails are original visual mockups of the real projects linked above.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
