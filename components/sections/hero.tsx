"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 8000;

const SLIDES = [
  {
    image: encodeURI("/pastEvents/KES 3 (18).jpg"),
    alt: "A Kingdom Entrepreneurs Summit speaker teaching from the stage",
    eyebrow: "The 2026 theme",
    title: "The Sovereign",
    accent: "Entrepreneur.",
    description:
      "A defining gathering for faith-driven entrepreneurs ready to build with purpose, lead with conviction, and create what lasts.",
    position: "50% 42%",
  },
  {
    image: encodeURI("/pastEvents/KES 3 (51).jpg"),
    alt: "A panel of entrepreneurs sharing ideas at a previous KES gathering",
    eyebrow: "Influence · Audacity · Legacy",
    title: "Build with",
    accent: "conviction.",
    description:
      "Step into a room designed to sharpen your thinking, strengthen your leadership, and move your vision forward.",
    position: "50% 42%",
  },
  {
    image: encodeURI("/pastEvents/KES 3 (165).jpg"),
    alt: "Entrepreneurs listening to a speaker during a Kingdom Entrepreneurs Summit session",
    eyebrow: "One room. One consequential day.",
    title: "Turn calling",
    accent: "into legacy.",
    description:
      "Meet builders who understand that enterprise is more than profit—it is influence, stewardship, and impact.",
    position: "50% 46%",
  },
] as const;

const EVENT_START = new Date(`${EVENT.dates.iso}T09:00:00+01:00`).getTime();

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EMPTY_COUNTDOWN: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getCountdown(): Countdown {
  const distance = Math.max(0, EVENT_START - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function CountdownClock({ countdown }: { countdown: Countdown }) {
  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <div
      className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-4 overflow-hidden rounded-2xl border border-white/15 bg-charcoal-950/52 backdrop-blur-md"
      aria-label="Countdown to the summit"
    >
      {units.map((unit, index) => (
        <div
          key={unit.label}
          className={`px-2 py-4 text-center sm:px-5 sm:py-5 ${
            index > 0 ? "border-l border-white/12" : ""
          }`}
        >
          <p className="text-2xl font-bold tabular-nums tracking-[-0.04em] text-white sm:text-4xl">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gold-300 sm:text-sm">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function EventFact({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-24 items-center gap-4 px-5 py-5 sm:px-7 lg:min-h-28 lg:px-8">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-300/30 bg-gold-400/10 text-sm font-bold text-gold-300">
        {number}
      </span>
      <div>
        <p className="text-label uppercase text-gold-300">{label}</p>
        <p className="mt-1 text-base font-semibold leading-6 text-white sm:text-lg">
          {children}
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>(EMPTY_COUNTDOWN);

  const select = useCallback((next: number) => {
    setActive(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const update = () => setCountdown(getCountdown());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reduce || paused || interacting) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [interacting, paused, reduce]);

  const slide = SLIDES[active];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-charcoal-950"
      aria-roledescription="carousel"
      aria-label="Kingdom Entrepreneurs Summit highlights"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              preload={active === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,22,51,0.9)_0%,rgba(3,22,51,0.62)_48%,rgba(3,22,51,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,24,0.36)_0%,rgba(3,22,51,0.14)_40%,rgba(2,10,24,0.84)_100%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 78%)",
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => select(active - 1)}
        aria-label="Show previous summit highlight"
        className="absolute left-3 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal-950/60 text-3xl text-white backdrop-blur-md transition hover:border-gold-300 hover:bg-gold-400 hover:text-charcoal-950 sm:flex lg:left-7"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => select(active + 1)}
        aria-label="Show next summit highlight"
        className="absolute right-3 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal-950/60 text-3xl text-white backdrop-blur-md transition hover:border-gold-300 hover:bg-gold-400 hover:text-charcoal-950 sm:flex lg:right-7"
      >
        ›
      </button>

      <div className="relative z-20 flex min-h-[calc(100svh-7rem)] items-center px-0 pb-10 pt-32 sm:pb-12 sm:pt-36 lg:min-h-[calc(100svh-7rem)] lg:pb-14">
        <div className="shell">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex items-center justify-center">
              <p className="rounded-full border border-gold-300/45 bg-charcoal-950/45 px-5 py-2 text-label uppercase text-gold-300 backdrop-blur-md sm:px-7">
                {EVENT.name} · {EVENT.year}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                className="mt-6"
              >
                {active === 0 ? (
                  <>
                    <p className="text-sm font-bold uppercase tracking-[0.42em] text-white sm:text-base">
                      Tagged
                    </p>
                    <h1
                      aria-label={EVENT.theme}
                      className="font-display mx-auto mt-2 uppercase leading-[1.1] tracking-[0.01em] text-white"
                    >
                      <span className="block text-[clamp(3.8rem,7vw,6.2rem)]">
                        The
                      </span>
                      <span className="block text-[clamp(4.2rem,10vw,8.2rem)] text-gold-300">
                        Sovereign
                      </span>
                      <span className="block text-[clamp(3.15rem,8vw,7rem)]">
                        Entrepreneur
                      </span>
                    </h1>
                    <p className="mx-auto mt-6 w-fit rounded-full border border-gold-300/20 bg-[#0a3a8b]/85 px-6 py-2.5 text-sm font-bold text-white shadow-card sm:px-9 sm:text-base">
                      {EVENT.tagline}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="mx-auto mt-4 text-balance text-[clamp(3.2rem,8vw,7.5rem)] font-bold leading-[1.1] tracking-[0.01em] text-white">
                      <span className="block">{slide.title}</span>
                      <span className="block text-gold-300">{slide.accent}</span>
                    </h1>
                    <p className="mx-auto mt-6 w-fit rounded-full border border-gold-300/20 bg-[#0a3a8b]/85 px-6 py-2.5 text-sm font-bold text-white shadow-card sm:px-9 sm:text-base">
                      {slide.eyebrow}
                    </p>
                  </>
                )}
                <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-cream-soft sm:text-xl sm:leading-9">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <CountdownClock countdown={countdown} />

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#register" variant="gold" size="lg">
                Claim Your Free Seat
                <span aria-hidden className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Button>
              <Button
                href="#sovereign"
                variant="ghost"
                size="lg"
                className="border-white/30 bg-charcoal-950/35 text-white hover:bg-white/10"
              >
                Discover the Summit
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => select(active - 1)}
                aria-label="Previous highlight"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/45 text-2xl text-white sm:hidden"
              >
                ‹
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Summit highlights">
                {SLIDES.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Show highlight ${index + 1}: ${item.title} ${item.accent}`}
                    onClick={() => select(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === active
                        ? "w-10 bg-gold-400"
                        : "w-2.5 bg-white/45 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => select(active + 1)}
                aria-label="Next highlight"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-charcoal-950/45 text-2xl text-white sm:hidden"
              >
                ›
              </button>

              <button
                type="button"
                onClick={() => setPaused((current) => !current)}
                className="hidden md:block ml-2 min-h-11 rounded-full border border-white/20 bg-charcoal-950/45 px-4 text-sm font-semibold text-white transition hover:border-gold-300 hover:text-gold-300"
                aria-label={paused ? "Resume automatic slides" : "Pause automatic slides"}
              >
                {paused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative z-20 border-t border-gold-300/25 bg-charcoal-950/94 backdrop-blur-xl">
        <div className="shell grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          <EventFact number="01" label="Event date">
            {EVENT.dates.full}
          </EventFact>
          <EventFact number="02" label="Event location">
            {EVENT.venue.name}, {EVENT.venue.cityShort}
          </EventFact>
          <EventFact number="03" label="Admission">
            Free with registration
          </EventFact>
        </div>
      </div> */}
    </section>
  );
}
