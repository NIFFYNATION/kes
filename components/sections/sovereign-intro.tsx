import { Reveal, ScrollWords } from "@/components/animations/reveal";
import { Eyebrow } from "@/components/ui/typography";
import { EVENT } from "@/lib/constants";

const DEFINITIONS = [
  {
    index: "01",
    body: "Does not wait for permission to build, lead, or occupy the space they were called to take.",
  },
  {
    index: "02",
    body: "Answers for what they build accountable for the standard, not only the outcome.",
  },
  {
    index: "03",
    body: "Treats every opportunity as something entrusted to them for more than profit.",
  },
];

export function SovereignIntro() {
  return (
    <section id="sovereign" className="theme-light relative overflow-hidden bg-white">
      {/* ---------- Layered gradient transition out of the hero ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f5f7fb 30%, #edf2f8 58%, #f7f9fc 82%, #ffffff 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[10%] right-[-12%] h-[52vw] w-[52vw] animate-drift-slower rounded-full opacity-60 blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,167,44,0.18), rgba(233,195,75,0.07) 52%, transparent 76%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-14%] left-[-10%] h-[46vw] w-[46vw] animate-drift-slow rounded-full opacity-55 blur-[130px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(23,66,126,0.12), transparent 74%)",
        }}
      />
      {/* Grain to keep the layered gradients from banding */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="shell section-y relative z-10">
        <Reveal>
          <Eyebrow>The Sovereign Entrepreneur</Eyebrow>
        </Reveal>

        {/* ---------------- Asymmetrical editorial split ---------------- */}
        <div className="mt-14 grid gap-y-16 lg:grid-cols-12 lg:gap-x-12">
          {/* Huge statement — left, deliberately oversized */}
          <h2 className="text-display-2 lg:col-span-7">
            <ScrollWords text="Stop waiting" className="text-cream" />
            <ScrollWords
              text="for permission."
              className="text-gold-gradient"
              delay={0.06}
            />
          </h2>

          {/* Supporting copy — right, narrow, dropped for asymmetry */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <Reveal delay={0.1}>
              <p className="text-lead text-pretty text-cream-dim">
                A sovereign entrepreneur does not wait for permission to build,
                lead, or occupy the space they were called to take.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 leading-relaxed text-cream-faint">
                They answer for what they build and treat every opportunity as
                something entrusted to them for more than profit.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Editorial definition block ---------------- */}
        <div className="mt-28 grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-2xl font-bold tracking-[-0.03em] text-cream">
                sovereign
              </p>
              <p className="mt-2 text-sm text-cream-faint">
                <span className="font-mono">| ˈsɒv.rɪn |</span>
                <span className="ml-2 italic">adjective</span>
              </p>
            </Reveal>
          </div>

          <div className="mt-10 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {DEFINITIONS.map((entry, i) => (
              <Reveal key={entry.index} delay={i * 0.08}>
                <div>
                  {/* Subtle gold divider between each entry */}
                  <div className="gold-divider opacity-40" />
                  <div className="flex gap-7 py-7">
                    <span className="text-label pt-1.5 text-gold-500/80">
                      {entry.index}
                    </span>
                    <p className="text-lg leading-relaxed tracking-[-0.015em] text-cream-soft">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={DEFINITIONS.length * 0.08}>
              <div className="gold-divider opacity-40" />
            </Reveal>
          </div>
        </div>

        {/* ---------------- Pull quote ---------------- */}
        <div className="mt-32 grid lg:grid-cols-12">
          <Reveal className="lg:col-span-9 lg:col-start-4">
            <figure className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-14 font-serif text-[9rem] leading-none text-gold-500/22 select-none lg:-left-14 lg:-top-16 lg:text-[12rem]"
              >
                &ldquo;
              </span>
              <blockquote className="relative text-display-3 text-balance text-cream">
                Every opportunity is entrusted to you for more than profit.
              </blockquote>
              <figcaption className="mt-9 flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-px w-12 bg-[linear-gradient(90deg,var(--color-gold-500),transparent)]"
                />
                <span className="text-label uppercase text-cream-faint">
                  {EVENT.name} {EVENT.year}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
