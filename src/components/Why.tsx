import { Cpu, MessagesSquare, ScanSearch, Sparkles, Target, TrendingUp, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Justo-style feature grid: six cards, each with a small blue icon in a
 * light-blue rounded square, a bold title and a one-line description.
 * The six principles are unchanged, only the presentation is new.
 */
const PRINCIPLES: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Sparkles,
    title: "Creative Excellence",
    text: "Every project is crafted with original thinking and a high standard of design",
  },
  {
    icon: Target,
    title: "Strategic Thinking",
    text: "We start from your goals, so every creative decision serves a real purpose",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    text: "We build with current tools and frameworks that keep your project fast and easy to update",
  },
  {
    icon: ScanSearch,
    title: "Attention to Detail",
    text: "Small details make the difference and we sweat them, from the first frame to the final pixel",
  },
  {
    icon: MessagesSquare,
    title: "Reliable Collaboration",
    text: "Clear communication and honest timelines, from first call to final delivery",
  },
  {
    icon: TrendingUp,
    title: "Results-Focused Execution",
    text: "Beautiful work is only half the job, it has to perform for your business",
  },
];

export default function Why() {
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
            Six principles guide everything we make, no shortcuts, no noise
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
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
