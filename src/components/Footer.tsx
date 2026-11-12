"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import DLogo from "./DLogo";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  { label: "Video Editing", href: "#video-editing" },
  { label: "Website Development", href: "#web-development" },
  { label: "AI & Automation", href: "#ai-automation" },
];

const SOCIALS = ["Instagram", "LinkedIn", "YouTube", "X"];

export default function Footer() {
  // Computed client-side after mount so the year is always current
  // without breaking static prerendering.
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    // Deferred on purpose: Next.js prerendering forbids new Date() during
    // render, so the year is read after mount (Next docs "defer" fix).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="border-t border-white/5 bg-panel/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Have an idea? Let&apos;s build something <span className="text-gradient-blue">meaningful.</span>
            </h2>
            <a
              href="#contact"
              className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-bright"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-mist">NAVIGATE</h3>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/85 transition-colors hover:text-bright">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-mist">SERVICES</h3>
              <ul className="mt-4 space-y-3">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/85 transition-colors hover:text-bright">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-mist">CONTACT</h3>
              <a
                href="mailto:developnearly@gmail.com"
                className="mt-4 flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-bright"
              >
                <Mail className="h-4 w-4 text-bright" />
                developnearly@gmail.com
              </a>
              <h3 className="mt-7 text-xs font-semibold tracking-[0.2em] text-mist">SOCIAL</h3>
              <ul className="mt-4 space-y-3">
                {SOCIALS.map((name) => (
                  <li key={name} className="text-sm text-mist">
                    {name} <span className="text-white/40">— coming soon</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <DLogo withWordmark />
          <p className="text-sm text-mist">© {year} DevelopNearly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
