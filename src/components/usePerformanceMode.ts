"use client";

import { useEffect, useState } from "react";

export type PerformanceMode = "high" | "mobile" | "low";

function detectMode(): PerformanceMode {
  if (typeof window === "undefined") return "high";

  // (a) Reduced motion always wins -> low mode.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";

  const nav = window.navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  // (d) Very weak device / data saver -> low mode.
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  const fewCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2;
  const saveData = Boolean(nav.connection?.saveData);
  const slowNet =
    nav.connection?.effectiveType === "slow-2g" || nav.connection?.effectiveType === "2g";
  if ((lowMemory && fewCores) || saveData || slowNet) return "low";

  // (b) + (c) Coarse pointer / touch or small screen -> mobile mode.
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.innerWidth < 768;
  if (coarsePointer || smallScreen) return "mobile";

  return "high";
}

/**
 * Adaptive performance hook.
 * - "high": desktop — full 3D + animations.
 * - "mobile": lightweight 3D, simplified effects, no mouse effects.
 * - "low": reduced motion or very weak device — no WebGL, reveals off,
 *   marquee slow/static, animations minimal.
 */
export function usePerformanceMode(): PerformanceMode {
  // Lazily detect on the client so phones never briefly mount the heavy
  // canvas. On the server detectMode() returns "high" (no window access).
  const [mode, setMode] = useState<PerformanceMode>(() => detectMode());

  useEffect(() => {
    const update = () => setMode(detectMode());
    update();
    window.addEventListener("resize", update);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  return mode;
}
