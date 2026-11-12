"use client";

import { useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { ArrowUpRight, Film, Globe } from "lucide-react";
import type { Project } from "../data/projects";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

/**
 * Real thumbnail — a screenshot of the live site or a frame from the actual video.
 * Video cards additionally overlay a muted preview clip (project.preview) that
 * fades in and plays while the card is hovered; the still image stays underneath
 * as the poster/fallback.
 */
function RealThumb({
  project,
  videoRef,
  previewPlaying,
}: {
  project: Project;
  videoRef?: RefObject<HTMLVideoElement | null>;
  previewPlaying?: boolean;
}) {
  if (!project.image || !project.imageAlt || !project.imageWidth || !project.imageHeight) {
    return <MockupThumb project={project} />;
  }
  // sizes must match the card's rendered width. Video cards live in a
  // 12-column grid at col-span-3 (~25vw on desktop); website cards live in
  // a 6-column grid — wide (col-span-4) ~66vw, mid (col-span-3) ~50vw,
  // narrow (col-span-2) ~33vw.
  const sizes =
    project.kind === "video"
      ? "(max-width: 768px) 100vw, 25vw"
      : project.span === "md:col-span-4"
        ? "(max-width: 768px) 100vw, 66vw"
        : project.span === "md:col-span-3"
          ? "(max-width: 768px) 100vw, 50vw"
          : "(max-width: 768px) 100vw, 33vw";
  return (
    <div className="relative h-full overflow-hidden bg-ink">
      <Image
        src={project.image}
        alt={project.imageAlt}
        width={project.imageWidth}
        height={project.imageHeight}
        loading="lazy"
        sizes={sizes}
        className="h-full w-full object-cover"
      />
      {project.kind === "video" && project.preview && (
        <video
          ref={videoRef}
          src={project.preview}
          poster={project.image}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            previewPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {project.kind === "video" && (
        <>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              previewPlaying ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
              <Film className="h-5 w-5" />
            </span>
          </span>
          <span className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold tracking-wider text-white">
            {project.badge ?? "DOCUMENTARY"}
          </span>
        </>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1"
        style={{ background: project.accent }}
      />
    </div>
  );
}

/**
 * CSS mockup thumbnail — fallback only, currently unused: every project now
 * has a real screenshot or video frame.
 */
function MockupThumb({ project }: { project: Project }) {
  return (
    <div className="relative h-full overflow-hidden bg-panel p-4 sm:p-5">
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink shadow-xl">
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
        <span className="absolute bottom-2.5 left-2.5 z-10 rounded-md bg-black/55 px-2 py-1 font-display text-[10px] font-bold tracking-[0.14em] text-white/90 backdrop-blur-sm sm:text-xs">
          {project.mockupLabel}
        </span>
      </div>
    </div>
  );
}

/** One portfolio card. Video cards play their muted preview on hover
 * (mouse enter) and pause + reset on mouse leave. Touch devices have no
 * hover, so nothing changes there — a tap still opens the Drive link.
 * prefers-reduced-motion is respected: no hover playback. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (project.kind !== "video" || !project.preview) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.then(() => setPreviewPlaying(true)).catch(() => undefined);
    } else {
      setPreviewPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
    }
    setPreviewPlaying(false);
  };

  const isVideo = project.kind === "video";
  return (
    <Reveal delay={(index % 3) * 0.08} className={project.span}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink transition-all duration-500 hover:-translate-y-1.5 hover:border-bright/50 hover:shadow-[0_24px_60px_rgba(59,130,246,0.18)]"
        aria-label={`${project.title}, ${project.category} (opens in a new tab)`}
      >
        <div className="relative aspect-video shrink-0 overflow-hidden">
          <div className="h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <RealThumb project={project} videoRef={videoRef} previewPlaying={previewPlaying} />
          </div>
        </div>
        <div className={`flex flex-1 items-start justify-between gap-3 ${isVideo ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-bright">{project.category.toUpperCase()}</p>
            <h3 className={`mt-2 font-display font-bold text-white ${isVideo ? "text-lg" : "text-xl"}`}>{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{project.description}</p>
          </div>
          <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

function GroupHeading({ icon, title, count }: { icon: React.ReactNode; title: string; count: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink text-bright">
        {icon}
      </span>
      <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      <span className="text-sm text-mist">{count}</span>
    </div>
  );
}

export default function Work() {
  const videos = projects.filter((project) => project.kind === "video");
  const websites = projects.filter((project) => project.kind === "website");
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
              <span className="font-semibold text-white">{websites.length} websites</span> ·{" "}
              <span className="font-semibold text-white">{videos.length} videos</span>
            </p>
          </div>
        </Reveal>

        <GroupHeading icon={<Film className="h-5 w-5" />} title="Video Editing" count={`${videos.length} videos`} />
        {/* Video cards are smaller than website cards: 4 per row on desktop
            (12-col grid, span-3) so the growing video list stays dense. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {videos.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-16">
          <GroupHeading icon={<Globe className="h-5 w-5" />} title="Web Development" count="5 websites" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {websites.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="flex items-center gap-2 text-sm text-mist">
            <Globe className="h-4 w-4 text-bright" />
            Thumbnails are real screenshots and video frames.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
