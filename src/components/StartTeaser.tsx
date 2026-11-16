import { ArrowRight, Bot, Clapperboard, Globe, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Justo-style plans teaser, adapted for an agency: no fake pricing plans,
 * just "start with what you need, add more as you grow", with three
 * add-on rows that jump to the matching service tab.
 */
const ADDONS: Array<{ icon: LucideIcon; title: string; text: string; href: string }> = [
  {
    icon: Globe,
    title: "Website Development",
    text: "A fast website for your business, ready to bring you customers",
    href: "#web-development",
  },
  {
    icon: Clapperboard,
    title: "Video Editing",
    text: "Videos that keep people watching and bring your story to life",
    href: "#video-editing",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    text: "Smart tools that take care of repetitive work for you",
    href: "#ai-automation",
  },
];

export default function StartTeaser() {
  return (
    <section aria-label="Start your project" className="border-t border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 flex items-center justify-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              START TODAY
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Start with what you need, add more as you grow
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              Pick one service to begin, the rest can follow when you are ready
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-4 sm:mt-16">
          {ADDONS.map((addon, i) => (
            <Reveal key={addon.title} delay={i * 0.08}>
              <a
                href={addon.href}
                className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-ink p-5 transition-all duration-300 hover:-translate-y-1 hover:border-bright/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563eb]/15 text-bright transition-colors duration-300 group-hover:bg-[#2563eb] group-hover:text-white">
                  <addon.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-bold text-white">{addon.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-mist">{addon.text}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-bright transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)]"
            >
              Start a Project
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
