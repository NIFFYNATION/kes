"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { seededRandom } from "@/lib/utils";

/**
 * Elegant floating particles.
 *
 * Positions come from a seeded PRNG so the server and client produce the
 * exact same markup — no hydration mismatch, no post-mount flash.
 */
export function Particles({
  count = 26,
  seed = 20260320,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const particles = useMemo(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, (_, i) => {
      const size = 1 + rand() * 2.6;
      return {
        id: i,
        left: rand() * 100,
        top: rand() * 100,
        size,
        // Smaller motes drift slower and sit further back
        opacity: 0.12 + rand() * 0.3,
        duration: 16 + rand() * 22,
        delay: rand() * -28,
        drift: -14 + rand() * 28,
        gold: rand() > 0.42,
      };
    });
  }, [count, seed]);

  if (reduce) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.gold
              ? "var(--color-gold-400)"
              : "var(--color-royal-400)",
            boxShadow: p.gold
              ? "0 0 6px 1px rgba(237, 154, 43, 0.4)"
              : "0 0 5px 1px rgba(68, 87, 208, 0.28)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: [0, -60, -120],
            x: [0, p.drift, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.15, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
