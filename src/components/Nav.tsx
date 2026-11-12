"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import DLogo from "./DLogo";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  // Close the menu and return focus to the menu button. The focus move is
  // delayed past the menu's 250ms exit animation: the clicked link stays
  // mounted until the exit finishes, and fragment navigation on the click
  // otherwise drops focus to <body> once the link unmounts.
  const closeMenuAndRefocus = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 300);
  }, []);

  // Move keyboard focus into the menu when it opens, and return it to the
  // menu button when it closes.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open ]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenuAndRefocus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenuAndRefocus]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a
          href="#home"
          className="relative z-10 rounded-lg focus-visible:outline-2"
          aria-label="DevelopNearly, back to home"
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
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_8px_30px_rgba(37,99,235,0.45)]"
          >
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          ref={menuButtonRef}
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
            className="mx-4 rounded-2xl border border-white/10 bg-ink/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((link, i) => (
                <li key={link.href}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenuAndRefocus}
                    className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-white transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={closeMenuAndRefocus}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 text-base font-semibold text-white"
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
