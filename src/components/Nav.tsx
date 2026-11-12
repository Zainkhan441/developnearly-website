"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import DLogo from "./DLogo";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            scrolled ? "glass opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <a
          href="#home"
          className="relative z-10 rounded-lg focus-visible:outline-2"
          aria-label="DevelopNearly — back to home"
        >
          <DLogo withWordmark />
        </a>

        <nav aria-label="Primary" className="relative z-10 hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-lg px-4 py-2.5 text-sm font-medium text-mist transition-colors hover:text-white"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="relative z-10 hidden lg:block">
          <a
            href="#contact"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-bright hover:shadow-[0_8px_30px_rgba(59,130,246,0.45)]"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          className="relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 bg-panel/80 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass mx-4 rounded-2xl p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-white transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-white"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
