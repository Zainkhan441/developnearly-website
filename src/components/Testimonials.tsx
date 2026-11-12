import { MessageSquareQuote } from "lucide-react";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="Client testimonials" className="border-t border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            TESTIMONIALS
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            What Clients Say.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-white/15 bg-ink/60 px-6 py-16 text-center sm:py-20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-bright">
              <MessageSquareQuote className="h-8 w-8" />
            </span>
            <p className="mt-6 max-w-md font-display text-xl font-semibold leading-relaxed text-white sm:text-2xl">
              Client testimonials will appear here as we complete more projects.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mist sm:text-base">
              We are building our portfolio of completed work. Real feedback from real
              clients will be shared here as it comes in.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              Become Our Next Success Story
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
