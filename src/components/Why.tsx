import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    n: "01",
    title: "Creative Excellence",
    text: "Every project is crafted with original thinking and a high standard of design",
  },
  {
    n: "02",
    title: "Strategic Thinking",
    text: "We start from your goals, so every creative decision serves a real purpose",
  },
  {
    n: "03",
    title: "Modern Technology",
    text: "We build with current tools and frameworks that keep your project fast and easy to update",
  },
  {
    n: "04",
    title: "Attention to Detail",
    text: "Small details make the difference and we sweat them, from the first frame to the final pixel",
  },
  {
    n: "05",
    title: "Reliable Collaboration",
    text: "Clear communication and honest timelines, from first call to final delivery",
  },
  {
    n: "06",
    title: "Results-Focused Execution",
    text: "Beautiful work is only half the job, it has to perform for your business",
  },
];

export default function Why() {
  return (
    <section id="why" aria-label="Why DevelopNearly" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal>
        <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          WHY US
        </p>
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Why DevelopNearly?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
          Six principles guide everything we make, no shortcuts, no noise
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.n} delay={(i % 3) * 0.08}>
            <div className="group border-t border-white/10 pt-6 transition-colors duration-300 hover:border-primary/60">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-bright">{p.n}</span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
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
