"use client";

import { motion, useReducedMotion } from "motion/react";
import { AmbientLight } from "@/components/animations/ambient-light";
import { Particles } from "@/components/animations/particles";
import { RegistrationForm } from "@/components/sections/registration-form";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Words rise from behind a mask — the signature editorial entrance. */
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
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

function MetaBlock({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: string;
  secondary: string;
}) {
  return (
    <div>
      <p className="text-label mb-2.5 uppercase text-gold-500">{label}</p>
      <p className="text-lg font-semibold tracking-[-0.02em] text-cream">
        {primary}
      </p>
      <p className="mt-1 text-sm text-cream-faint">{secondary}</p>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col justify-center overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28"
    >
      <AmbientLight variant="hero" />
      <Particles count={28} className="z-[1]" />

      <div className="shell relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          {/* ------------------------------ Left ------------------------------ */}
          <div className="lg:col-span-7">
            {/* Event badge */}
            <motion.div {...fade(0.05)}>
              <span className="inline-flex items-center gap-3 rounded-full border border-gold-500/25 bg-gold-500/[0.07] py-2 pl-3 pr-4.5 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
                </span>
                <span className="text-label uppercase text-gold-300">
                  {EVENT.venue.cityShort} · {EVENT.dates.short} · {EVENT.year}
                </span>
              </span>
            </motion.div>

            {/* Massive headline */}
            <h1 className="text-display-1 mt-8">
              <span className="sr-only">
                {EVENT.theme} — {EVENT.name} {EVENT.year}
              </span>
              <span aria-hidden>
                <AnimatedLine text="The Sovereign" className="text-cream" delay={0.15} />
                <AnimatedLine
                  text="Entrepreneur."
                  className="text-gold-gradient"
                  delay={0.28}
                />
              </span>
            </h1>

            {/* Tagline */}
            <motion.p
              {...fade(0.55)}
              className="mt-8 text-2xl font-semibold tracking-[-0.03em] text-cream-soft sm:text-3xl"
            >
              Influence. Audacity. Legacy.
            </motion.p>

            {/* Supporting copy */}
            <motion.p
              {...fade(0.62)}
              className="text-lead mt-6 max-w-xl text-pretty text-cream-dim"
            >
              A free gathering for faith-driven entrepreneurs ready to build with
              purpose, lead with conviction, and create something worth
              repeating.
            </motion.p>

            {/* Date + venue */}
            <motion.div {...fade(0.74)} className="mt-12">
              <div className="hairline max-w-lg" />
              <div className="mt-7 flex flex-wrap items-start gap-x-14 gap-y-8">
                <MetaBlock
                  label="Date"
                  primary={EVENT.dates.label}
                  secondary={EVENT.dates.day}
                />
                <MetaBlock
                  label="Venue"
                  primary={EVENT.venue.name}
                  secondary={`${EVENT.venue.street}, ${EVENT.venue.area}`}
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              {...fade(0.86)}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button href="#register" variant="gold" size="lg">
                Claim Your Free Seat
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
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
              </Button>
              <Button href="#sovereign" variant="ghost" size="lg">
                Explore the Summit
              </Button>
            </motion.div>
          </div>

          {/* ------------------------------ Right ----------------------------- */}
          <div id="register" className="scroll-mt-24 lg:col-span-5">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.15, delay: 0.4, ease: EASE }}
              className="relative"
            >
              {/* Warm glow pooling behind the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(247,148,29,0.22), transparent 72%)",
                }}
              />
              {/* Perpetual float */}
              <motion.div
                animate={reduce ? {} : { y: [0, -9, 0] }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <RegistrationForm />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        {...fade(1.3)}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-label uppercase text-cream-faint">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-white/12">
            <span className="absolute inset-x-0 top-0 h-4 animate-scroll-hint bg-gold-400" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
