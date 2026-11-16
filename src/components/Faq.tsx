import type { ServiceKey } from "../data/services";
import { SERVICES } from "../data/services";
import Reveal from "./Reveal";

export default function Faq({ service }: { service: ServiceKey }) {
  const FAQS = SERVICES[service].faqs;
  return (
    <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            FAQ
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Questions? <span className="text-gradient-blue">Answered</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            Everything clients usually ask before starting a project, and anything else, just ask us directly
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group rounded-2xl border border-white/10 bg-panel px-5 py-4 open:border-bright/40 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg font-normal text-bright transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
