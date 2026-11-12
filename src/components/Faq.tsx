import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What services does DevelopNearly offer?",
    a: "Three core services: professional video editing, complete website development, and AI & automation. Every project is handled in-house, from the first idea to launch.",
  },
  {
    q: "How much does a website cost?",
    a: "Every project is priced on its scope: pages, features, and timeline. Tell us about your project through the form or WhatsApp and we will give you a clear, fixed price before any work starts. No hidden charges.",
  },
  {
    q: "How long does a project take?",
    a: "Most small business websites take around 1–2 weeks once we have your content. Video editing depends on the length and style of the video. We always confirm the timeline with you before starting.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes. We work with clients worldwide, fully remote, and communicate in English. You can reach us by email or WhatsApp from anywhere.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your goals, any content you already have (logo, photos, text), and examples of websites or videos you like. If you do not have everything yet, we will help you figure it out.",
  },
  {
    q: "How do we begin?",
    a: "Fill in the contact form below or message us on WhatsApp. We will reply with the next steps and a price. No pressure, no obligation.",
  },
] as const;

export default function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            FAQ
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Questions? <span className="text-gradient-blue">Answered.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            Everything clients usually ask before starting a project. Anything else, just ask us directly.
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
