"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { Choice } from "../data/services";
import { REVISIONS, SERVICES, buildPackages, purposeOf } from "../data/services";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

/** Event the Contact form listens for, so "Choose" prefills the form. */
export const CHOOSE_PACKAGE_EVENT = "dn:choose-package";

export default function Packages({ choice }: { choice: Choice }) {
  const info = SERVICES[choice.service];
  const { packages: shown, recommended } = buildPackages(choice);
  const purpose = purposeOf(choice).label;
  const whatsapp = (name: string, price: string, per?: string) =>
    `https://wa.me/923131134962?text=${encodeURIComponent(
      `Hi DevelopNearly! I am interested in the ${name} package (${price}${per ? ` ${per}` : ""}) for: ${purpose}`,
    )}`;

  const choose = (name: string, price: string) => {
    window.dispatchEvent(new CustomEvent(CHOOSE_PACKAGE_EVENT, { detail: `${name} package (${price})` }));
  };

  return (
    <section id="packages" aria-label="Packages and prices" className="scroll-mt-24 border-t border-white/5 bg-panel/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 flex items-center justify-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-bright">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              PACKAGES
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Packages <span className="text-gradient-blue">made for you</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              Built around what you told us, every package includes {REVISIONS} free revisions, prices in USD
            </p>
          </div>
        </Reveal>

        <div
          className={`mx-auto mt-12 grid grid-cols-1 items-stretch gap-6 sm:mt-16 ${
            shown.length >= 3 ? "max-w-6xl md:grid-cols-3" : shown.length === 2 ? "max-w-4xl md:grid-cols-2" : "max-w-md"
          }`}
        >
          {shown.map((pkg, i) => {
            const featured = pkg === recommended;
            return (
            <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${
                  featured
                    ? "border border-[#2563eb]/60 bg-gradient-to-b from-[#2563eb]/25 via-[#2563eb]/10 to-panel shadow-[0_24px_60px_rgba(37,99,235,0.25)]"
                    : "border border-white/10 bg-ink hover:border-bright/50"
                }`}
              >
                {featured ? (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#2563eb] px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-white shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    RECOMMENDED FOR YOU
                  </span>
                ) : null}
                <h3 className="font-display text-2xl font-bold text-white">{pkg.name}</h3>
                <p className="mt-1.5 text-sm text-mist">{pkg.tagline}</p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tracking-tight text-white">{pkg.price}</span>
                  {pkg.per && <span className="text-sm text-mist">{pkg.per}</span>}
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-bright">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => choose(pkg.name, pkg.price)}
                  className={`group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    featured
                      ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)]"
                      : "border border-white/15 bg-white/5 text-white hover:border-bright/60 hover:bg-white/10"
                  }`}
                >
                  Choose {pkg.name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={whatsapp(pkg.name, pkg.price, pkg.per)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-[#25d366]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25d366]" />
                  Ask on WhatsApp
                </a>
              </div>
            </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-mist sm:text-base">
            {info.packagesNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
