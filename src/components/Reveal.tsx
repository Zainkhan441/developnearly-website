"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePerformanceMode } from "./usePerformanceMode";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Scroll-reveal wrapper: content rises in and tips forward from a slight 3D
 * angle as it enters the screen. Phones get a lighter fade-up, and in "low"
 * mode (reduced motion or weak device) content simply shows.
 */
export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const mode = usePerformanceMode();

  if (mode === "low") {
    return <div className={className}>{children}</div>;
  }

  const threeD = mode === "high";
  return (
    <motion.div
      className={className}
      initial={threeD ? { opacity: 0, y: y + 12, rotateX: 14, scale: 0.97 } : { opacity: 0, y }}
      whileInView={threeD ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 1, y: 0 }}
      style={threeD ? { transformPerspective: 1200, transformOrigin: "50% 100%" } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
