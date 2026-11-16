"use client";

import { Mail } from "lucide-react";
import DLogo from "./DLogo";
import WhatsAppIcon from "./WhatsAppIcon";
import type { Choice } from "../data/services";
import { introMessage, waLink } from "../data/whatsapp";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "#work" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_ITEMS: Record<string, string[]> = {
  video: ["YouTube videos", "Shorts & Reels", "TikTok videos", "Podcast editing"],
  web: ["Business websites", "Landing pages", "Online stores", "Website redesigns"],
};

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/developnearly/" },
];

export default function Footer({ year, servicePage = false, choice }: { year: number; servicePage?: boolean; choice?: Choice }) {
  const navLinks = servicePage ? NAV_LINKS : NAV_LINKS.filter((l) => !l.href.startsWith("#"));
  const ctaHref = waLink(introMessage(choice));
  return (
    <footer className="border-t border-white/5 bg-panel/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Have an idea? Let&apos;s build something <span className="text-gradient-blue">meaningful</span>
            </h2>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-mist">NAVIGATE</h3>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-white/85 transition-colors hover:text-bright">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {choice ? (
              <div>
                <h3 className="text-xs font-semibold tracking-[0.2em] text-mist">WHAT WE DO</h3>
                <ul className="mt-4 space-y-3">
                  {SERVICE_ITEMS[choice.service].map((item) => (
                    <li key={item}>
                      <a href="#packages" className="text-sm text-white/85 transition-colors hover:text-bright">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-mist">CONTACT</h3>
              <a
                href="mailto:developnearly@gmail.com"
                className="mt-4 flex min-w-0 items-center gap-2 text-sm text-white/85 transition-colors hover:text-bright"
              >
                <Mail className="h-4 w-4 shrink-0 text-bright" />
                <span className="min-w-0 break-all">developnearly@gmail.com</span>
              </a>
              <a
                href={waLink(introMessage(choice))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-w-0 items-center gap-2 text-sm text-white/85 transition-colors hover:text-[#25d366]"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25d366]" />
                <span className="min-w-0 break-all">+92 313 1134962</span>
              </a>
              <h3 className="mt-7 text-xs font-semibold tracking-[0.2em] text-mist">SOCIAL</h3>
              <ul className="mt-4 space-y-3">
                {SOCIALS.map((social) => (
                  <li key={social.name} className="text-sm text-mist">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/85 transition-colors hover:text-bright"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <DLogo withWordmark />
          <p className="text-sm text-mist">© {year} DevelopNearly, all rights reserved</p>
          <nav aria-label="Legal" className="flex items-center gap-5 text-sm text-mist">
            <a href="/privacy" className="transition-colors hover:text-bright">Privacy Policy</a>
            <a href="/terms" className="transition-colors hover:text-bright">Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
