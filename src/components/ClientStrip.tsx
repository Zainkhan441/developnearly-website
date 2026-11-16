import Reveal from "./Reveal";
import { projects } from "../data/projects";

/**
 * Justo-style logo strip: a small caps label and the real businesses we
 * built websites for, as text wordmarks that link to the live sites. Only
 * the five real website projects from projects.ts, never an invented logo.
 */
export default function ClientStrip() {
  const websites = projects.filter((project) => project.kind === "website");
  return (
    <section aria-label="Businesses we built websites for" className="border-y border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.28em] text-mist">
            WEBSITES WE BUILT FOR
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {websites.map((site) => (
              <li key={site.slug}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg font-bold tracking-tight text-white/60 transition-colors hover:text-white sm:text-xl"
                  aria-label={`${site.title} website (opens in a new tab)`}
                >
                  {site.title}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
