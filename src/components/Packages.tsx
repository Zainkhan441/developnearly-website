"use client";

import { Check, Gift, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { Choice } from "../data/services";
import { FREE_SAMPLE, NON_PAYMENT_RULES, PAYMENT_RULES, REVISIONS, SERVICES, buildPackages } from "../data/services";
import { packageMessage, sampleMessage, waLink } from "../data/whatsapp";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

/** Event the Contact form listens for, so "Choose" prefills the form. */
export const CHOOSE_PACKAGE_EVENT = "dn:choose-package";

export default function Packages({ choice }: { choice: Choice }) {
  const info = SERVICES[choice.service];
  const { packages: shown, recommended } = buildPackages(choice);

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
              Packages & <span className="text-gradient-blue">Pricing</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              {REVISIONS} free revisions on every package, and you pay only after delivery
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
                    MOST POPULAR
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
                  href={waLink(packageMessage(choice, pkg.name, pkg.price, pkg.per))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    featured
                      ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)]"
                      : "border border-white/15 bg-white/5 text-white hover:border-bright/60 hover:bg-white/10"
                  }`}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Choose {pkg.name}
                </a>
                <a
                  href="#contact"
                  onClick={() => choose(pkg.name, `${pkg.price}${pkg.per ? ` ${pkg.per}` : ""}`)}
                  className="mt-3 inline-flex min-h-10 items-center justify-center text-sm font-medium text-mist underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Prefer email?
                </a>
              </div>
            </Reveal>
            );
          })}
        </div>

        {choice.service === "video" ? (
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 rounded-3xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent p-6 text-center sm:flex-row sm:p-7 sm:text-left">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                <Gift className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <p className="font-display text-xl font-bold text-white">Not sure yet? Try us for free</p>
                <p className="mt-1 text-[15px] leading-relaxed text-mist">
                  Send your script, voiceover or footage and we will edit a free 30 second to 1 minute sample, you pay nothing unless you like it
                </p>
              </div>
              <a
                href={waLink(sampleMessage(choice))}
                target="_blank"
                rel="noopener noreferrer"
                data-sample={FREE_SAMPLE}
                className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-emerald-500 px-6 text-sm font-semibold text-ink transition-colors hover:bg-emerald-400"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get my free sample
              </a>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.18}>
          <div id="payment" className="mx-auto mt-10 max-w-4xl scroll-mt-24 rounded-3xl border border-white/10 bg-ink p-6 sm:p-8">
            <h3 className="flex items-center gap-3 font-display text-xl font-bold text-white sm:text-2xl">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              How payment works
            </h3>
            <p className="mt-2 text-[15px] text-mist">Pay after the work is done, simple and fair for both sides</p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {PAYMENT_RULES[choice.service].map((rule, i) => (
                <li key={rule} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-[15px] leading-relaxed text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/20 text-xs font-bold text-bright">
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h4 className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
                <Scale className="h-5 w-5 text-bright" />
                Keeping it fair for everyone
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">
                We trust our clients, that is why you pay after the work. We hope we never need
                the rules below. They are only here to keep things fair for both sides
              </p>
              <ul className="mt-4 space-y-2.5">
                {NON_PAYMENT_RULES[choice.service].map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-white/85">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bright" />
                    {rule}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-mist">
                Thanks for understanding. These rules are what let us offer pay after delivery to everyone. See our{" "}
                <a href="/terms" className="font-semibold text-bright underline-offset-4 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-mist sm:text-base">
            {info.packagesNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
