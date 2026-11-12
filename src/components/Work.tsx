"use client";

import { ArrowUpRight, Film, Globe } from "lucide-react";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

/** Original CSS/SVG mockup thumbnail — a visual mockup of the real project, never a screenshot claim. */
function MockupThumb({ project }: { project: Project }) {
  if (project.kind === "video") {
    return (
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.accentSoft} 0%, #10131c 70%)` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(circle at 70% 20%, ${project.accent}55, transparent 55%)` }}
        />
        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <Film className="h-6 w-6" />
        </span>
        <span className="absolute bottom-3 left-3 right-3 z-10 font-display text-xs font-bold tracking-[0.14em] text-white sm:text-sm">
          {project.mockupLabel}
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold tracking-wider text-white">
          DOCUMENTARY
        </span>
        <span aria-hidden="true" className="absolute inset-x-3 bottom-9 h-1 rounded-full bg-white/20">
          <span className="block h-full w-1/3 rounded-full" style={{ background: project.accent }} />
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
        <div className="flex flex-1 flex-col justify-center gap-2 p-4">
          <span
            className="h-3 w-3/4 rounded-full"
            style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}66)` }}
          />
          <span className="h-2.5 w-1/2 rounded-full bg-white/10" />
          <span className="h-2.5 w-2/3 rounded-full bg-white/10" />
          <span
            className="mt-2 inline-flex h-7 w-24 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: project.accent }}
          >
            VISIT SITE
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
