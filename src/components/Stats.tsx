"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ServiceKey } from "../data/services";
import { REVISIONS } from "../data/services";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {inView ? value : 0}
      {suffix}
    </span>
  );
}

/** Real numbers only: counts from projects.ts and the site's own promises. */
export default function Stats({ service }: { service: ServiceKey }) {
  const videos = projects.filter((p) => p.kind === "video").length;
  const sites = projects.filter((p) => p.kind === "website").length;
  const items =
    service === "video"
      ? [
          { n: videos, label: "Videos edited" },
          { n: 48, suffix: "h", label: "Shorts delivery" },
          { n: REVISIONS, label: "Free revisions" },
          { n: 0, prefix: "$", label: "Paid upfront" },
        ]
      : [
          { n: sites, label: "Websites live" },
          { n: 100, suffix: "%", label: "Mobile-friendly" },
          { n: REVISIONS, label: "Free revisions" },
          { n: 0, prefix: "$", label: "Paid upfront" },
        ];
  return (
    <section aria-label="DevelopNearly in numbers" className="border-y border-white/5 bg-panel/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <span className="text-gradient-blue">
                <CountUp to={it.n} prefix={it.prefix} suffix={it.suffix} />
              </span>
            </p>
            <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-mist sm:text-sm">{it.label.toUpperCase()}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
