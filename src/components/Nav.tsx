"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Choice } from "../data/services";
import { budgetOf, purposeOf } from "../data/services";
import Link from "next/link";
import DLogo from "./DLogo";

const PAGE_LINKS = [
  { label: "Our Work", href: "#work" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
];

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Shows the visitor's answers, with a button to answer again. */
function AnswersChip({ choice, onChange, className = "" }: { choice: Choice; onChange: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onChange}
      title="Change your answers"
      className={`inline-flex min-h-10 max-w-[13rem] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-semibold text-white/85 transition-colors hover:border-bright/60 hover:text-white sm:max-w-none sm:text-sm ${className}`}
    >
      <SlidersHorizontal className="h-4 w-4 shrink-0 text-bright" />
      <span className="truncate">
        <span className="hidden sm:inline">{purposeOf(choice).label} · </span>
        {budgetOf(choice).label}
      </span>
      <span className="text-bright sm:hidden">Edit</span>
      <span className="hidden text-bright sm:inline">Change</span>
    </button>
  );
}

export default function Nav({ choice, onChangeAnswers }: { choice?: Choice; onChangeAnswers?: () => void }) {
  const service = choice?.service;
  const LINKS = service ? PAGE_LINKS : SITE_LINKS;
  const ctaHref = service ? "#contact" : "/";
  const ctaLabel = service ? "Get a Quote" : "Start a Project";
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
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4">
      {/* Floating pill bar, Justo-style: a narrow rounded bar that stays
          visible on every scroll, with the logo, links and CTA inside. */}
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-ink/95 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-white/10 bg-ink/80 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        } py-2 pl-3 pr-2 sm:pl-4`}
      >
        <Link
          href="/"
          className="relative z-10 shrink-0 rounded-lg focus-visible:outline-2"
          aria-label="DevelopNearly, back to home"
        >
          <span className="hidden sm:inline-flex"><DLogo withWordmark /></span>
          <span className="sm:hidden"><DLogo /></span>
        </Link>

        <nav aria-label="Primary" className="relative z-10 hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-mist transition-colors hover:text-white"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {choice && onChangeAnswers ? (
          <AnswersChip choice={choice} onChange={onChangeAnswers} className="relative z-10 ml-auto lg:ml-0" />
        ) : null}

        <div className="relative z-10 hidden shrink-0 lg:block">
          <a
            href={ctaHref}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_8px_30px_rgba(37,99,235,0.45)]"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          ref={menuButtonRef}
          className="relative z-10 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-panel/80 text-white lg:hidden"
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
            className="mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-ink/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
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
                  href={ctaHref}
                  onClick={closeMenuAndRefocus}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 text-base font-semibold text-white"
                >
                  {ctaLabel}
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
