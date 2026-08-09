"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { Eyebrow, SectionTitle, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Moment = { src: string; caption: string };

/**
 * Filenames carry spaces and parentheses, so they are URL-encoded on the way
 * into next/image. The files themselves are left untouched.
 */
const MOMENTS: Moment[] = [
  { src: "KES 3 (12).jpg", caption: "The room fills — opening session" },
  { src: "KES 3 (16).jpg", caption: "Teaching from the main stage" },
  { src: "KES 3 (18).jpg", caption: "Founders taking notes" },
  { src: "KES 3 (51).jpg", caption: "Panel on building with conviction" },
  { src: "KES 3 (66).jpg", caption: "Worship before the work" },
  { src: "KES 3 (101).jpg", caption: "Questions from the floor" },
  { src: "KES 3 (103).jpg", caption: "Keynote — stewardship and scale" },
  { src: "KES 3 (132).jpg", caption: "Connections made between sessions" },
  { src: "KES 3 (137).jpg", caption: "Prayer over the businesses" },
  { src: "KES 3 (165).jpg", caption: "The last edition, sent out" },
].map((m) => ({ ...m, src: encodeURI(`/pastEvents/${m.src}`) }));

const COUNT = MOMENTS.length;
const AUTOPLAY_MS = 5200;

/** Shortest signed distance from the active slide, wrapping around the loop. */
function offsetFrom(i: number, active: number) {
  let off = (i - active) % COUNT;
  if (off > COUNT / 2) off -= COUNT;
  if (off < -COUNT / 2) off += COUNT;
  return off;
}

/* ------------------------------- Carousel -------------------------------- */

function Coverflow({
  active,
  onSelect,
  onOpen,
  onHoverChange,
}: {
  active: number;
  onSelect: (index: number) => void;
  onOpen: (index: number) => void;
  onHoverChange: (hovering: boolean) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-[16/10] w-full max-w-5xl select-none sm:aspect-[16/9]"
      style={{ perspective: "1600px" }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {MOMENTS.map((moment, i) => {
        const off = offsetFrom(i, active);
        const distance = Math.abs(off);

        // Only the active slide and two neighbours per side stay mounted.
        if (distance > 2) return null;

        const isActive = off === 0;

        return (
          <motion.div
            key={moment.src}
            className="absolute inset-y-0 left-1/2 w-[78%] sm:w-[70%]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              x: `calc(-50% + ${off * 46}%)`,
              scale: isActive ? 1 : 0.84 - (distance - 1) * 0.07,
              rotateY: off * -13,
              opacity: distance >= 2 ? 0.25 : isActive ? 1 : 0.62,
              zIndex: 10 - distance,
              filter: isActive ? "blur(0px)" : `blur(${distance * 1.5}px)`,
            }}
            transition={reduce ? { duration: 0 } : { duration: 0.85, ease: EASE }}
            drag={isActive ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) onSelect(active + 1);
              else if (info.offset.x > 60) onSelect(active - 1);
            }}
          >
            <button
              type="button"
              aria-label={
                isActive
                  ? `Open photo: ${moment.caption}`
                  : `Show photo: ${moment.caption}`
              }
              aria-current={isActive || undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => (isActive ? onOpen(i) : onSelect(i))}
              className={cn(
                "group relative h-full w-full overflow-hidden rounded-panel border bg-charcoal-900",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-charcoal-900",
                isActive
                  ? "cursor-zoom-in border-gold-500/28 shadow-float"
                  : "cursor-pointer border-cream/12 shadow-lift",
              )}
            >
              <Image
                src={moment.src}
                alt={moment.caption}
                fill
                priority={i < 3}
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 780px"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* Depth wash — keeps the frame anchored in the dark page */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,14,0)_38%,rgba(4,4,14,0.72)_100%)]"
              />

              {/* Caption + zoom affordance, active slide only */}
              {isActive && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                  <span className="text-left text-sm font-medium leading-snug tracking-[-0.01em] text-white sm:text-[0.9375rem]">
                    {moment.caption}
                  </span>
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-400/60 bg-gold-500/15 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:flex">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 text-gold-300"
                      aria-hidden
                    >
                      <path
                        d="M10.5 10.5L14 14M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM7 5v4M5 7h4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              )}

              {/* Luminous top edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-gold-400),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-70"
              />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------- Lightbox -------------------------------- */

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (next: number) => void;
}) {
  const reduce = useReducedMotion();
  const moment = MOMENTS[index];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(index + 1);
      if (event.key === "ArrowLeft") onStep(index - 1);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={moment.caption}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgba(12,10,20,0.92)] px-4 py-16 backdrop-blur-xl"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:border-gold-400/60 hover:text-gold-300 sm:right-8 sm:top-8"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
          <path
            d="M12 4L4 12M4 4l8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <motion.figure
        className="relative max-h-full w-full max-w-5xl"
        initial={reduce ? false : { scale: 0.94, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 18 }}
        transition={{ duration: 0.42, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-panel border border-white/10 shadow-float">
          <Image
            src={moment.src}
            alt={moment.caption}
            width={1600}
            height={1067}
            sizes="(max-width: 1024px) 92vw, 1024px"
            className="h-auto max-h-[74vh] w-full object-contain"
            priority
          />
        </div>
        <figcaption className="mt-5 flex items-center justify-center gap-4 text-sm text-white/70">
          <span>{moment.caption}</span>
          <span aria-hidden className="h-px w-6 bg-white/25" />
          <span className="font-mono text-xs text-white/45">
            {String(index + 1).padStart(2, "0")} / {COUNT}
          </span>
        </figcaption>
      </motion.figure>

      <div
        className="mt-8 flex items-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <StepButton
          direction="prev"
          tone="onDark"
          onClick={() => onStep(index - 1)}
        />
        <StepButton
          direction="next"
          tone="onDark"
          onClick={() => onStep(index + 1)}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------- Fragments -------------------------------- */

function StepButton({
  direction,
  onClick,
  tone = "light",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  tone?: "light" | "onDark";
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous photo" : "Next photo"}
      className={cn(
        "group flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900",
        tone === "onDark"
          ? "border-white/15 bg-white/[0.06] text-white hover:border-gold-400/60 hover:bg-white/[0.12] hover:text-gold-300"
          : "border-cream/12 bg-cream/[0.03] text-cream hover:border-gold-500/45 hover:bg-cream/[0.06] hover:text-gold-600",
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className={cn(
          "h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isPrev
            ? "rotate-180 group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5",
        )}
        aria-hidden
      >
        <path
          d="M2.5 8h11M9 3.5L13.5 8 9 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* -------------------------------- Section --------------------------------- */

export function PastEvents() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const select = useCallback(
    (next: number) => setActive(((next % COUNT) + COUNT) % COUNT),
    [],
  );

  // Autoplay pauses on hover and while the lightbox is open.
  useEffect(() => {
    if (reduce || hovering || lightbox !== null) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % COUNT),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduce, hovering, lightbox]);

  return (
    <section id="past-events" className="theme-light relative overflow-hidden bg-white">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #eef3f9 44%, #ffffff 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[14%] h-[44vw] w-[72vw] -translate-x-1/2 animate-breathe blur-[150px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,167,44,0.13), transparent 74%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12%] left-[-8%] h-[42vw] w-[42vw] animate-drift-slow rounded-full opacity-60 blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(23,66,126,0.12), transparent 74%)",
        }}
      />

      <div className="shell section-y relative z-10">
        {/* Header — editorial split */}
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Past Editions</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionTitle className="mt-7">
                Moments worth repeating.
              </SectionTitle>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.14}>
              <Lead>
                Rooms full of founders who came to build. This is what the last
                gathering looked like and the standard we are carrying into
                2026.
              </Lead>
            </Reveal>
          </div>
        </div>

        {/* Carousel */}
        <Reveal delay={0.1} className="mt-16 lg:mt-20">
          <Coverflow
            active={active}
            onSelect={select}
            onOpen={setLightbox}
            onHoverChange={setHovering}
          />
        </Reveal>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center gap-7">
          <div className="flex items-center gap-5">
            <StepButton direction="prev" onClick={() => select(active - 1)} />

            <p className="font-mono text-sm tracking-[0.08em] text-cream-faint">
              <span className="text-gold-600">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5 text-cream-faint/50">/</span>
              {String(COUNT).padStart(2, "0")}
            </p>

            <StepButton direction="next" onClick={() => select(active + 1)} />
          </div>

          {/* Progress rail */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Choose a photo"
          >
            {MOMENTS.map((moment, i) => (
              <button
                key={moment.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={moment.caption}
                onClick={() => select(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900",
                  i === active
                    ? "w-10 bg-[linear-gradient(90deg,var(--color-gold-500),var(--color-bronze-500))]"
                    : "w-4 bg-cream/15 hover:bg-cream/30",
                )}
              />
            ))}
          </div>
        </div>

        {/* Receipts */}
        <Reveal delay={0.16}>
          <div className="mt-24 grid gap-px overflow-hidden rounded-panel border border-cream/10 bg-cream/8 sm:grid-cols-3">
            {[
              { value: "300+", label: "Entrepreneurs gathered" },
              { value: "15+", label: "Speakers and mentors" },
              { value: "3", label: "Editions delivered" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-charcoal-900/85 p-9 text-center backdrop-blur-sm lg:p-10"
              >
                <p className="text-numeral text-gold-gradient">{stat.value}</p>
                <p className="text-label mt-3 uppercase text-cream-faint">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            index={lightbox}
            onClose={() => setLightbox(null)}
            onStep={(next) => {
              const wrapped = ((next % COUNT) + COUNT) % COUNT;
              setLightbox(wrapped);
              setActive(wrapped);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
