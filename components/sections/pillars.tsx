"use client";

import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { Eyebrow, SectionTitle, Lead } from "@/components/ui/typography";
import {
  InfluenceIcon,
  AudacityIcon,
  LegacyIcon,
} from "@/components/ui/pillar-icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    number: "01",
    title: "Influence",
    caption: "A platform that strengthens",
    body: "Build a trusted brand and use your platform to strengthen people, communities, and industries.",
    Icon: InfluenceIcon,
  },
  {
    number: "02",
    title: "Audacity",
    caption: "Conviction without applause",
    body: "Make courageous decisions, lead with conviction, and move without waiting for applause.",
    Icon: AudacityIcon,
  },
  {
    number: "03",
    title: "Legacy",
    caption: "Principles others carry forward",
    body: "Build businesses, develop people, and leave principles others can carry forward.",
    Icon: LegacyIcon,
  },
];

/**
 * VisionOS-style card: soft glass, luminous border, and a specular highlight
 * that tracks the pointer. The highlight is driven through CSS custom
 * properties so we never re-render React on mousemove.
 */
function PillarCard({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
      className={[
        "group relative isolate h-full overflow-hidden rounded-panel p-9 lg:p-10",
        "glass shadow-lift",
        "transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-2 hover:border-gold-500/30 hover:shadow-card",
      ].join(" ")}
      style={
        {
          "--mx": "50%",
          "--my": "0%",
        } as CSSProperties
      }
    >
      {/* Specular highlight following the cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx) var(--my), rgba(247,148,29,0.17), transparent 62%)",
        }}
      />
      {/* Gradient glow bleeding up from the base */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 -z-10 h-40 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(251,139,60,0.32), transparent 74%)",
        }}
      />
      {/* Luminous top edge — the VisionOS tell */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(244,245,250,0.35),transparent)] transition-opacity duration-700 group-hover:bg-[linear-gradient(90deg,transparent,var(--color-gold-400),transparent)]"
      />
      {children}
    </motion.article>
  );
}

export function Pillars() {
  return (
    <section id="pillars" className="relative overflow-hidden">
      {/* Gradient bed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #070718 0%, #0a0a1f 40%, #0a0a1f 62%, #070718 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-[42vw] w-[78vw] -translate-x-1/2 animate-breathe blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(247,148,29,0.16), transparent 72%)",
        }}
      />

      <div className="shell section-y relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Three Pillars</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-7">
              What we build in you.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.14}>
            <Lead className="mt-7">
              Every session is engineered around three capacities — the ones
              that separate a business owner from a sovereign builder.
            </Lead>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.title} index={i}>
              {/* Large elegant icon */}
              <div className="relative mb-10 inline-flex">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(247,148,29,0.5), transparent 72%)",
                  }}
                />
                <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-card border border-white/10 bg-white/[0.04] transition-colors duration-700 group-hover:border-gold-500/35">
                  <pillar.Icon className="h-9 w-9 text-gold-400 transition-colors duration-700 group-hover:text-gold-300" />
                </span>
              </div>

              <p className="text-label mb-5 uppercase text-gold-500/70">
                {pillar.number} — {pillar.caption}
              </p>

              <h3 className="text-[2rem] font-bold leading-none tracking-[-0.035em] text-cream">
                {pillar.title}
              </h3>

              <p className="mt-5 leading-relaxed text-cream-faint">
                {pillar.body}
              </p>
            </PillarCard>
          ))}
        </div>
      </div>
    </section>
  );
}
