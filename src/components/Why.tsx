import { Cpu, MessagesSquare, ScanSearch, Sparkles, Target, TrendingUp, type LucideIcon } from "lucide-react";
import type { ServiceKey } from "../data/services";
import Reveal from "./Reveal";

/**
 * Justo-style feature grid: six cards, each with a small blue icon in a
 * light-blue rounded square, a bold title and a one-line description.
 * The six principles are unchanged, only the presentation is new.
 */
const PRINCIPLES: Record<ServiceKey, Array<{ icon: LucideIcon; title: string; text: string }>> = {
  video: [
    { icon: Sparkles, title: "Retention-First Editing", text: "Every cut, caption and sound effect is there to keep viewers watching to the end" },
    { icon: Target, title: "Your Channel's Style", text: "We study your channel and edit in the style your audience already loves" },
    { icon: Cpu, title: "Fast Turnaround", text: "Shorts in about 48 hours and long videos in a few days, so you never miss an upload" },
    { icon: ScanSearch, title: "Attention to Detail", text: "Clean audio, smooth cuts and no typos in captions, from the first frame to the last" },
    { icon: MessagesSquare, title: "Easy to Work With", text: "Send files on Google Drive, get updates on WhatsApp, ask for changes any time" },
    { icon: TrendingUp, title: "Built to Grow Your Channel", text: "Strong hooks and pacing that help your videos get more views and subscribers" },
  ],
  web: [
    { icon: Sparkles, title: "Modern Design", text: "A clean, professional look that makes people trust your business at first glance" },
    { icon: Target, title: "Built Around Your Goals", text: "Every page is planned to get visitors to call, book or buy" },
    { icon: Cpu, title: "Fast & Mobile-Friendly", text: "Quick to load and easy to use on every phone, tablet and computer" },
    { icon: ScanSearch, title: "Attention to Detail", text: "Every button, form and page is tested before your site goes live" },
    { icon: MessagesSquare, title: "Easy to Work With", text: "Clear updates on WhatsApp and honest timelines from start to launch" },
    { icon: TrendingUp, title: "Ready for Google", text: "Set up so your business can be found on Google and Google Maps" },
  ],
};

export default function Why({ service }: { service: ServiceKey }) {
  const list = PRINCIPLES[service];
  return (
    <section id="why" aria-label="Why DevelopNearly" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 flex items-center justify-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            WHY US
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Why DevelopNearly?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            What you get when you work with us
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <div className="group h-full rounded-3xl border border-white/10 bg-panel p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-bright/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563eb]/15 text-bright transition-colors duration-300 group-hover:bg-[#2563eb] group-hover:text-white">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
