import { Bot, Clapperboard, Globe } from "lucide-react";
import DLogo from "./DLogo";
import Reveal from "./Reveal";

const DEPARTMENTS = [
  {
    icon: Clapperboard,
    title: "Video Editing",
    text: "Engaging video content that keeps audiences watching, from documentaries to Shorts and Reels",
    href: "#video-editing",
  },
  {
    icon: Globe,
    title: "Website Development",
    text: "Modern, fast websites and web applications designed around your business and your customers",
    href: "#web-development",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    text: "Intelligent systems that simplify operations: chatbots, workflows, and business automation",
    href: "#ai-automation",
  },
];

export default function About() {
  return (
    <section id="about" aria-label="About DevelopNearly" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="mb-4 flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            ABOUT US
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Creative Thinking
            <br />
            <span className="text-gradient-blue">Intelligent Technology</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            DevelopNearly is a creative digital agency that helps businesses turn ideas
            into meaningful digital experiences, from video content to modern websites
            and intelligent automation, bringing creativity and technology together to
            build solutions that matter
          </p>
          <div className="mt-8 flex items-center gap-4">
            <DLogo className="h-12 w-12" />
            <div>
              <p className="font-display text-lg font-bold text-white">DevelopNearly</p>
              <p className="text-sm text-mist">Creative Digital Agency</p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-6">
          {DEPARTMENTS.map((dept, i) => (
            <Reveal key={dept.title} delay={i * 0.1}>
              <a
                href={dept.href}
                className="group flex items-start gap-5 rounded-3xl border border-white/10 bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bright/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] sm:p-7"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-bright transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <dept.icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold text-white">{dept.title}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-mist">{dept.text}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
