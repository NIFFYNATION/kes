"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionIntro } from "@/components/ui/section-intro";
import { PAST_EDITIONS } from "@/lib/site-content";

const EASE = [0.22, 1, 0.36, 1] as const;

const TAB_STYLES: Record<string, string> = {
  navy: "bg-[#173481] text-white",
  gold: "bg-[#d7b45a] text-[#061d45]",
  rose: "bg-[#bd8797] text-white",
};

export function PastEditions() {
  const reduce = useReducedMotion();
  const [editionIndex, setEditionIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const edition = PAST_EDITIONS[editionIndex];
  const item = edition.gallery[galleryIndex];

  const selectEdition = (index: number) => {
    setEditionIndex(index);
    setGalleryIndex(0);
  };

  const step = (direction: number) => {
    setGalleryIndex(
      (current) =>
        (current + direction + edition.gallery.length) % edition.gallery.length,
    );
  };

  return (
    <section
      id="past-events"
      className="theme-light relative overflow-hidden bg-white section-y"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(47,95,159,0.08),transparent_45%)]"
      />
      <div className="shell relative z-10">
        <SectionIntro
          eyebrow="Past Editions"
          title="The journey so far"
          description="Select an edition to view its official flyer first, followed by moments captured from that year's gathering."
        />

        <div
          className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-3 sm:gap-5"
          role="tablist"
          aria-label="Choose a KES edition"
        >
          {PAST_EDITIONS.map((option, index) => (
            <button
              key={option.year}
              type="button"
              role="tab"
              aria-selected={index === editionIndex}
              onClick={() => selectEdition(index)}
              className={`min-h-16 rounded-xl px-3 text-xl font-bold transition duration-300 sm:min-h-20 sm:text-2xl ${
                TAB_STYLES[option.accent]
              } ${
                index === editionIndex
                  ? "-translate-y-1 shadow-card ring-2 ring-gold-500 ring-offset-4 ring-offset-white"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              {option.year}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-[2rem] border border-cream/10 bg-white shadow-float sm:rounded-[2.5rem]">
          <div
            className={`relative ${
              item.kind === "flyer"
                ? "aspect-[4/5] sm:aspect-[16/10]"
                : "aspect-[4/3] sm:aspect-[16/10]"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${edition.year}-${item.src}`}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 3rem), 64rem"
                  className={item.kind === "flyer" ? "object-contain" : "object-cover"}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-charcoal-950 p-6 sm:flex sm:items-end sm:justify-between sm:gap-8 sm:p-8">
            <div>
              {/* <p className="text-label uppercase text-gold-300">
                {item.kind === "flyer" ? "Official flyer" : edition.edition}
              </p> */}
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">
                {edition.theme}
              </h3>
              {/* <p className="mt-2 text-base text-cream-dim">{item.caption}</p> */}
            </div>
            {/* <p className="mt-5 text-base font-semibold text-gold-300 sm:mt-0">
              {edition.location}
            </p> */}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-xl items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edition.gallery.length === 1}
            aria-label="Previous image"
            className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/15 bg-white text-3xl text-cream shadow-lift transition hover:border-gold-500 disabled:cursor-not-allowed disabled:opacity-35 sm:h-20 sm:w-20"
          >
            ←
          </button>

          <p className="text-xl font-bold tabular-nums text-cream">
            <span className="text-gold-700">
              {String(galleryIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-3 text-cream-faint">/</span>
            {String(edition.gallery.length).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={edition.gallery.length === 1}
            aria-label="Next image"
            className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/15 bg-white text-3xl text-cream shadow-lift transition hover:border-gold-500 disabled:cursor-not-allowed disabled:opacity-35 sm:h-20 sm:w-20"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
