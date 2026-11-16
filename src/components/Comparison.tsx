import { ArrowRight, Check, X } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Justo-style comparison: two side-by-side cards, "Without DevelopNearly"
 * with red crosses against "With DevelopNearly" in a blue gradient with
 * green ticks. Every item is a plain, honest statement about the service,
 * never an invented stat or result.
 */
const WITHOUT = [
  "No website of your own",
  "Customers can only find you on social media",
  "Orders and bookings arrive through scattered messages",
  "Videos and routine work eat your whole week",
];

const WITH = [
  "A fast website that works for you day and night",
  "Customers find your menu, services and prices in one place",
  "One clear place to book, order and ask",
  "Videos and automations that save you hours every week",
];

export default function Comparison() {
  return (
    <section aria-label="Working with DevelopNearly compared with working alone" className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 flex items-center justify-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              THE DIFFERENCE
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What changes when you work with us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              The difference is simple, one team takes care of your website, your videos and your routine work
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-panel p-7 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-white">Without DevelopNearly</h3>
              <ul className="mt-7 space-y-4">
                {WITHOUT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-mist sm:text-base">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-[#2563eb]/50 bg-gradient-to-b from-[#2563eb]/25 via-[#2563eb]/10 to-panel p-7 shadow-[0_24px_60px_rgba(37,99,235,0.2)] sm:p-8">
              <h3 className="font-display text-2xl font-bold text-white">With DevelopNearly</h3>
              <ul className="mt-7 space-y-4">
                {WITH.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-white sm:text-base">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)]"
            >
              See the difference for your business
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
