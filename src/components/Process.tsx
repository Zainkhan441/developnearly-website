"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "Discover", text: "We listen first — understanding your business, your audience, and what success looks like." },
  { n: "02", title: "Strategize", text: "We turn what we learned into a clear plan: scope, style, structure, and timeline." },
  { n: "03", title: "Create", text: "Design, development, and editing come together into a working first version." },
  { n: "04", title: "Refine", text: "We review, test, and polish with your feedback until every detail feels right." },
  { n: "05", title: "Deliver", text: "We launch, hand over, and support you as your project goes live." },
];

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.55"],
  });

  return (
    <section id="process" aria-label="Our process" className="border-t border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            PROCESS
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From Idea to Impact.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            A simple, transparent process — you always know where your project stands.
          </p>
        </Reveal>

        <div ref={trackRef} className="relative mt-14 sm:mt-20">
          {/* Track line + animated scroll progress */}
          <div aria-hidden="true" className="absolute left-[19px] top-0 h-full w-px bg-white/10 lg:left-0 lg:top-[19px] lg:h-px lg:w-full">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-bright to-primary lg:origin-left lg:bg-gradient-to-r"
              style={{ scaleY: scrollYProgress, scaleX: scrollYProgress }}
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <li className="flex gap-5 lg:flex-col lg:gap-0">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bright/50 bg-ink font-display text-sm font-bold text-bright shadow-[0_0_24px_rgba(59,130,246,0.35)]">
                    {step.n}
                  </span>
                  <div className="lg:pt-6">
                    <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
