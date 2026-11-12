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
 * Scroll-reveal wrapper. In "low" performance mode reveals are OFF and
 * content is visible by default — usability is never sacrificed for motion.
 */
export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const mode = usePerformanceMode();

  if (mode === "low") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
