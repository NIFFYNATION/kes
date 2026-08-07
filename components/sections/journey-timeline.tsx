"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { Eyebrow, SectionTitle, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const MILESTONES = [
  { year: "2020", city: "Ado Ekiti", caption: "Where it began" },
  { year: "2023", city: "Ibadan", caption: "A new city" },
  { year: "2025", city: "Ibadan", caption: "A wider table" },
  {
    year: "2026",
    city: "Ibadan",
    caption: "The Sovereign Entrepreneur",
    current: true,
  },
];

export function JourneyTimeline() {
  const reduce = useReducedMotion();

  return (
    <section id="journey" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f6f3ec 0%, #efeade 44%, #f6f3ec 100%)",
        }}
      />
      {/* Warm light pooling under the current year */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-1/2 h-[38vw] w-[46vw] animate-breathe blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(247,160,70,0.14), transparent 74%)",
        }}
      />

      <div className="shell section-y relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The Journey</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-7">Six years in the making.</SectionTitle>
          </Reveal>
          <Reveal delay={0.14}>
            <Lead className="mt-7">
              Every edition has gathered faith-driven entrepreneurs who build
              with purpose and lead with conviction. This one is the most
              consequential yet.
            </Lead>
          </Reveal>
        </div>

        {/* ---------------------- Horizontal timeline ---------------------- */}
        <div className="relative mt-24">
          {/* Connecting line — drawn left to right as it enters view */}
          {/* Sits at exactly half the 6rem node row, so it threads the dots */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px lg:block"
          >
            <div className="h-px w-full bg-cream/12" />
            <motion.div
              className="absolute inset-0 h-px origin-left"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-gold-700), var(--color-gold-500) 62%, var(--color-gold-300))",
              }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </div>

          {/* Vertical rail on mobile */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[0.6875rem] top-2 w-px bg-cream/12 lg:hidden"
          />

          <ol className="grid gap-14 lg:grid-cols-4 lg:gap-8">
            {MILESTONES.map((m, i) => (
              <motion.li
                key={m.year}
                className="relative pl-12 lg:pl-0"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.16, ease: EASE }}
              >
                {/* Node */}
                <div className="absolute left-0 top-1.5 lg:static">
                  <div className="relative flex h-6 w-6 items-center justify-center lg:h-24 lg:w-full lg:justify-start">
                    <span className="relative flex items-center justify-center">
                      {m.current && !reduce && (
                        <>
                          {/* Expanding halo rings */}
                          <span
                            aria-hidden
                            className="absolute h-6 w-6 animate-ring-expand rounded-full border border-gold-400/60"
                          />
                          <span
                            aria-hidden
                            className="absolute h-6 w-6 animate-ring-expand rounded-full border border-gold-400/40"
                            style={{ animationDelay: "1.7s" }}
                          />
                          {/* Soft gold bloom */}
                          <span
                            aria-hidden
                            className="absolute h-14 w-14 animate-glow-pulse rounded-full blur-lg"
                            style={{
                              background:
                                "radial-gradient(closest-side, rgba(247,160,70,0.6), transparent 72%)",
                            }}
                          />
                        </>
                      )}
                      <span
                        className={cn(
                          "relative z-10 block rounded-full transition-all duration-700",
                          m.current
                            ? "h-3.5 w-3.5 bg-gold-500 shadow-[0_0_18px_4px_rgba(240,150,40,0.4)]"
                            : "h-2.5 w-2.5 bg-charcoal-600 ring-4 ring-charcoal-900",
                        )}
                      />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:pr-6">
                  <p
                    className={cn(
                      "text-numeral tabular-nums transition-colors duration-700",
                      m.current ? "text-gold-gradient" : "text-cream/25",
                    )}
                  >
                    {m.year}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <h3
                      className={cn(
                        "text-xl font-bold tracking-[-0.03em]",
                        m.current ? "text-cream" : "text-cream-dim",
                      )}
                    >
                      {m.city}
                    </h3>
                    {m.current && (
                      <span className="text-label rounded-full border border-gold-500/30 bg-gold-500/[0.08] px-2.5 py-1 uppercase text-gold-600">
                        Next
                      </span>
                    )}
                  </div>

                  <p className="text-label mt-3 uppercase text-gold-500/70">
                    {m.caption}
                  </p>

                  {/* The arrival marker */}
                  {m.current && (
                    <motion.p
                      className="text-label mt-6 uppercase text-cream"
                      initial={reduce ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                    >
                      <span className="mr-2 text-gold-500">→</span>
                      You are here.
                    </motion.p>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
