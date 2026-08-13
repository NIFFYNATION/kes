"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CAMPAIGN_SLIDES } from "@/lib/site-content";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 5200;

export function CampaignSlider() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const select = (next: number) => {
    setActive(
      ((next % CAMPAIGN_SLIDES.length) + CAMPAIGN_SLIDES.length) %
        CAMPAIGN_SLIDES.length,
    );
  };

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % CAMPAIGN_SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  const slide = CAMPAIGN_SLIDES[active];

  return (
    <section
      className="theme-light relative overflow-hidden bg-charcoal-900 py-16 sm:py-20"
      aria-roledescription="carousel"
      aria-label="KES 2026 campaign announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,167,44,0.12),transparent_42%)]"
      />
      <div className="shell relative z-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[2rem] border border-cream/10 bg-white shadow-float sm:rounded-[2.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -22 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
            >
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.alt ?? slide.title}
                  fill
                  loading="eager"
                  sizes="(max-width: 640px) calc(100vw - 3rem), 34rem"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(145deg,#061d45,#031633)] px-8 text-center">
                  <span className="rounded-full border border-gold-300/30 bg-gold-400/10 px-4 py-2 text-label uppercase text-gold-300">
                    {slide.label}
                  </span>
                  <h2 className="mt-7 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-sm text-base leading-7 text-cream-dim sm:text-lg">
                    {slide.description}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-8 flex max-w-[34rem] items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => select(active - 1)}
            aria-label="Previous campaign announcement"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#061a5b] bg-[#061a5b] text-3xl text-white shadow-card transition hover:-translate-y-1 hover:border-[#0a2a7d] hover:bg-[#0a2a7d] sm:h-20 sm:w-20"
          >
            ←
          </button>

          <div className="flex items-center gap-2.5" role="tablist">
            {CAMPAIGN_SLIDES.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-label={`Show ${item.title}`}
                aria-selected={index === active}
                onClick={() => select(index)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === active
                    ? "w-12 bg-gold-500"
                    : "w-3 bg-charcoal-600/45 hover:bg-charcoal-600"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => select(active + 1)}
            aria-label="Next campaign announcement"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#061a5b] bg-[#061a5b] text-3xl text-white shadow-card transition hover:-translate-y-1 hover:border-[#0a2a7d] hover:bg-[#0a2a7d] sm:h-20 sm:w-20"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
