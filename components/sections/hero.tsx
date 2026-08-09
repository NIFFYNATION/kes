"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useState, type MouseEvent as ReactMouseEvent } from "react";
import { AmbientLight } from "@/components/animations/ambient-light";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const STORIES = [
  {
    label: "Influence",
    title: "Own the room.",
    copy: "Build the clarity and credibility that make people lean in.",
  },
  {
    label: "Audacity",
    title: "Move with conviction.",
    copy: "Make courageous decisions before applause or certainty arrives.",
  },
  {
    label: "Legacy",
    title: "Build beyond profit.",
    copy: "Create principles, people, and enterprises that outlive the moment.",
  },
] as const;

function AnimatedLine({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={cn("block", className)}>{text}</span>;
  }

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: { duration: 0.95, ease: EASE },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 170,
    damping: 24,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), {
    stiffness: 170,
    damping: 24,
  });
  const [activeStory, setActiveStory] = useState(0);

  function onPointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  const story = STORIES[activeStory];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-charcoal-950 pb-20 pt-28 lg:pb-28 lg:pt-36"
    >
      <AmbientLight variant="hero" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.8), transparent 82%)",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="lg:col-span-6">
            <motion.div {...fade(0.04)}>
              <span className="inline-flex items-center gap-3 rounded-full border border-gold-400/35 bg-gold-400/10 px-4 py-2.5 text-label uppercase text-gold-300 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
                </span>
                {EVENT.venue.cityShort} · {EVENT.dates.short} · {EVENT.year}
              </span>
            </motion.div>

            <h1 className="mt-8 text-[clamp(3.35rem,6.6vw,6.8rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              <span className="sr-only">
                {EVENT.theme} — {EVENT.name} {EVENT.year}
              </span>
              <span aria-hidden>
                <AnimatedLine text="The Sovereign" className="text-white" delay={0.12} />
                <AnimatedLine
                  text="Entrepreneur."
                  className="text-gold-gradient"
                  delay={0.24}
                />
              </span>
            </h1>

            <motion.p
              {...fade(0.48)}
              className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
            >
              Influence. Audacity. Legacy.
            </motion.p>

            <motion.p
              {...fade(0.56)}
              className="mt-6 max-w-xl text-lg leading-8 text-cream-dim sm:text-xl"
            >
              A free gathering for faith-driven entrepreneurs ready to build
              with purpose, lead with conviction, and create what lasts.
            </motion.p>

            <motion.div
              {...fade(0.66)}
              className="mt-9 grid max-w-xl gap-5 border-y border-white/12 py-6 sm:grid-cols-2"
            >
              <div>
                <p className="text-label uppercase text-gold-300">Date</p>
                <p className="mt-2 text-base font-semibold text-white sm:text-lg">
                  {EVENT.dates.label}
                </p>
              </div>
              <div>
                <p className="text-label uppercase text-gold-300">Venue</p>
                <p className="mt-2 text-base font-semibold text-white sm:text-lg">
                  {EVENT.venue.name}, {EVENT.venue.cityShort}
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fade(0.76)}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button href="#register" variant="gold" size="lg">
                Claim Your Free Seat
                <span aria-hidden className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Button>
              <Button href="#sovereign" variant="ghost" size="lg">
                Explore the Summit
              </Button>
            </motion.div>
          </div>

          <motion.div
            {...fade(0.34)}
            className="relative lg:col-span-6"
            onMouseMove={onPointerMove}
            onMouseLeave={resetPointer}
          >
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[3rem] bg-gold-400/15 blur-3xl"
            />
            <motion.div
              style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
              className="relative overflow-hidden rounded-[2rem] border border-gold-300/35 bg-charcoal-900 shadow-float"
            >
              <div className="relative aspect-[4/3] min-h-[30rem] lg:min-h-[39rem]">
                <Image
                  src="/hero-entrepreneur-alt.jpg"
                  alt="A Black entrepreneur working with focus in a modern office"
                  fill
                  preload
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[42%_center] saturate-[0.82] contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,22,51,0.06)_20%,rgba(3,22,51,0.28)_58%,rgba(3,22,51,0.97)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,22,51,0.28),transparent_58%)] mix-blend-multiply" />

                <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-charcoal-950/75 px-4 py-2 text-label uppercase text-white backdrop-blur-md sm:left-7 sm:top-7">
                  KES · Edition 04
                </div>
                <div className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold-300/55 bg-gold-400/15 text-base font-bold text-gold-200 backdrop-blur-md sm:right-7 sm:top-7 sm:h-20 sm:w-20 sm:text-lg">
                  2026
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={story.label}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="max-w-md"
                    >
                      <p className="text-label uppercase text-gold-300">
                        {story.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                        {story.title}
                      </p>
                      <p className="mt-3 text-base leading-7 text-cream-dim sm:text-lg">
                        {story.copy}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div
                    className="mt-7 grid grid-cols-3 gap-2"
                    role="tablist"
                    aria-label="Summit pillars"
                  >
                    {STORIES.map((item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        role="tab"
                        aria-selected={activeStory === index}
                        onClick={() => setActiveStory(index)}
                        className={cn(
                          "min-h-12 rounded-xl border px-2 text-sm font-semibold transition-all duration-300 sm:text-base",
                          activeStory === index
                            ? "border-gold-300 bg-gold-400 text-charcoal-950 shadow-gold"
                            : "border-white/18 bg-white/8 text-white hover:border-gold-300/60 hover:bg-white/12",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <p className="mt-4 text-center text-sm leading-6 text-cream-faint">
              Move across the image and choose a pillar to explore the theme.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
