"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Clapperboard,
  Globe,
  HelpCircle,
  Camera,
  LayoutTemplate,
  Mic,
  MonitorSmartphone,
  Music2,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  UserRound,
  Wallet,
  MonitorPlay,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Choice, ServiceKey } from "../data/services";
import { SERVICES } from "../data/services";
import DLogo from "./DLogo";

/**
 * Full-screen welcome questions shown before anything else on the site:
 * 1) video or website, 2) what it is for, 3) budget. The site itself is not
 * rendered until all three are answered, so the visitor only ever sees the
 * version of the site that matches their answers.
 */

const PURPOSE_ICONS: Record<string, LucideIcon> = {
  youtube: MonitorPlay,
  shorts: Smartphone,
  reels: Camera,
  tiktok: Music2,
  facebook: Users,
  podcast: Mic,
  business: BriefcaseBusiness,
  other: HelpCircle,
  landing: LayoutTemplate,
  store: ShoppingBag,
  portfolio: UserRound,
  redesign: RefreshCw,
  notsure: HelpCircle,
};

const WEB_PURPOSE_ICONS: Record<string, LucideIcon> = { business: Globe };

function Option({
  icon: Icon,
  label,
  hint,
  onClick,
  autoFocus,
  big = false,
}: {
  icon: LucideIcon;
  label: string;
  hint?: string;
  onClick: () => void;
  autoFocus?: boolean;
  big?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-bright/60 hover:bg-[#2563eb]/15 hover:shadow-[0_16px_40px_rgba(37,99,235,0.25)] focus-visible:border-bright focus-visible:outline-none ${
        big ? "min-h-24 p-5 sm:p-6" : "min-h-16 p-4"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl bg-[#2563eb]/15 text-bright transition-colors duration-300 group-hover:bg-[#2563eb] group-hover:text-white ${
          big ? "h-14 w-14" : "h-11 w-11"
        }`}
      >
        <Icon className={big ? "h-7 w-7" : "h-5 w-5"} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block font-display font-bold text-white ${big ? "text-xl sm:text-2xl" : "text-base"}`}>{label}</span>
        {hint ? <span className={`mt-0.5 block text-mist ${big ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>{hint}</span> : null}
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-mist transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
    </button>
  );
}

export default function Welcome({
  initialService,
  onDone,
}: {
  initialService?: ServiceKey;
  onDone: (choice: Choice) => void;
}) {
  const [service, setService] = useState<ServiceKey | null>(initialService ?? null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const step = service === null ? 0 : purpose === null ? 1 : 2;
  const firstStep = initialService ? 1 : 0;
  const totalSteps = initialService ? 2 : 3;
  const stepNumber = step - firstStep + 1;

  // Lock page scroll while the questions are open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const back = () => {
    if (step === 2) setPurpose(null);
    else if (step === 1 && !initialService) setService(null);
  };

  const info = service ? SERVICES[service] : null;

  const titles = [
    { title: "What do you need?", sub: "Answer 3 quick questions and we will show you the right packages for you" },
    { title: info?.purposeQuestion ?? "", sub: "Pick the one that fits best" },
    { title: "What is your budget?", sub: "We will show you the packages that fit it, no surprises" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink"
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[50rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto flex min-h-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex items-center justify-between">
          <DLogo withWordmark />
          <span className="text-xs font-semibold tracking-[0.2em] text-mist">
            STEP {stepNumber} OF {totalSteps}
          </span>
        </div>

        {/* progress */}
        <div className="mt-6 flex gap-2" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-bright to-primary transition-all duration-500"
                style={{ width: i < stepNumber ? "100%" : "0%" }}
              />
            </span>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${step}-${service ?? ""}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 id="welcome-title" className="text-center font-display text-[clamp(2rem,6vw,3.25rem)] font-bold leading-tight tracking-tight text-white">
                {step === 0 ? (
                  <>
                    What do you <span className="text-gradient-blue">need</span>?
                  </>
                ) : (
                  titles[step].title
                )}
              </h1>
              <p className="mx-auto mt-3 max-w-md text-center text-base text-mist sm:text-lg">{titles[step].sub}</p>

              <div className="mt-9">
                {step === 0 && (
                  <div className="grid gap-4">
                    <Option
                      big
                      autoFocus
                      icon={Clapperboard}
                      label="I want my videos edited"
                      hint="YouTube, Shorts, Reels, TikTok, podcasts, ads"
                      onClick={() => setService("video")}
                    />
                    <Option
                      big
                      icon={MonitorSmartphone}
                      label="I want a website"
                      hint="Business site, landing page, online store"
                      onClick={() => setService("web")}
                    />
                  </div>
                )}

                {step === 1 && info && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {info.purposes.map((p, i) => (
                      <Option
                        key={p.id}
                        autoFocus={i === 0}
                        icon={(service === "web" ? WEB_PURPOSE_ICONS[p.id] : undefined) ?? PURPOSE_ICONS[p.id] ?? HelpCircle}
                        label={p.label}
                        hint={p.hint}
                        onClick={() => setPurpose(p.id)}
                      />
                    ))}
                  </div>
                )}

                {step === 2 && info && service && purpose && (
                  <div className="grid gap-3">
                    {info.budgetOptions.map((b, i) => (
                      <Option
                        key={b.label}
                        autoFocus={i === 0}
                        icon={Wallet}
                        label={b.label}
                        onClick={() => onDone({ service, purpose, budget: i })}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex min-h-11 items-center justify-between">
          {step > firstStep ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-mist transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <span />
          )}
          <a
            href="https://wa.me/923131134962?text=Hi%20DevelopNearly!%20I%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-mist underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Prefer to talk? WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
