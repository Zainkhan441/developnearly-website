"use client";

import { useEffect, useState } from "react";
import type { Choice, ServiceKey } from "../data/services";
import { SERVICES } from "../data/services";
import ServicePage from "./ServicePage";
import Welcome from "./Welcome";

const STORAGE_KEY = "dn-choice-v2";

function readStored(initialService?: ServiceKey): Choice | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Choice;
    if (!SERVICES[c.service] || typeof c.budgetValue !== "number" || !c.budgetLabel) return null;
    if (initialService && c.service !== initialService) return null;
    return c;
  } catch {
    return null;
  }
}

/**
 * The whole site behind the welcome questions: nothing of the site is
 * rendered until the visitor has answered them. Answers are remembered for
 * the browser tab (sessionStorage) so a refresh does not ask again.
 */
export default function SiteApp({ year, initialService }: { year: number; initialService?: ServiceKey }) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);

  useEffect(() => {
    // Read after mount (sessionStorage is browser-only), async so the
    // state change never runs synchronously inside the effect.
    const id = window.setTimeout(() => {
      setChoice(readStored(initialService));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, [initialService]);

  const done = (c: Choice) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      // Storage can be unavailable (private mode); the answers still apply.
    }
    window.scrollTo(0, 0);
    setChoice(c);
  };

  const reset = () => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setChoice(null);
  };

  if (!ready) return <div className="min-h-screen bg-ink" aria-busy="true" />;
  if (!choice) return <Welcome initialService={initialService} onDone={done} />;
  return <ServicePage choice={choice} year={year} onChangeAnswers={reset} />;
}

/**
 * Wraps any other page (privacy, terms): the welcome questions come first
 * there too, so no page of the site is visible before they are answered.
 */
export function Gate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setChoice(readStored());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const done = (c: Choice) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      // ignore
    }
    setChoice(c);
  };

  if (!ready) return <div className="min-h-screen bg-ink" aria-busy="true" />;
  if (!choice) return <Welcome onDone={done} />;
  return <>{children}</>;
}
