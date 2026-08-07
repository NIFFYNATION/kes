import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { Eyebrow } from "@/components/ui/typography";

const CREEDS = [
  "Build businesses.",
  "Build people.",
  "Leave something worth repeating.",
];

export function Manifesto() {
  return (
    <section className="relative overflow-hidden">
      {/* Royal blue light bed — the tonal pivot of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 0%, rgba(90,110,220,0.14) 0%, transparent 62%), linear-gradient(180deg, #f6f3ec, #e9e3f2 48%, #f6f3ec)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[38vw] w-[70vw] -translate-x-1/2 animate-breathe blur-[130px]"
        style={{
         background:
            "radial-gradient(closest-side, rgba(90,110,220,0.16), transparent 74%)",
        }}
      />

      <div className="shell section-y relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow className="justify-center" withRule={false}>
              The Manifesto
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display-2 mt-9 text-balance text-cream">
              Build what heaven can{" "}
              <span className="text-gold-gradient">trust you with.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-lead mx-auto mt-10 max-w-2xl text-pretty text-cream-dim">
              This is not about surviving another business cycle. It is about
              becoming someone who builds businesses, builds people, and leaves
              something worth repeating.
            </p>
          </Reveal>
        </div>

        <Stagger className="mx-auto mt-24 grid max-w-5xl gap-px overflow-hidden rounded-panel border border-cream/10 bg-cream/8 sm:grid-cols-3">
          {CREEDS.map((creed, i) => (
            <StaggerItem key={creed}>
              <div className="h-full bg-charcoal-900/85 p-9 backdrop-blur-sm lg:p-10">
                <p className="text-label mb-5 uppercase text-gold-500/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-xl font-semibold leading-snug tracking-[-0.03em] text-cream-soft">
                  {creed}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
