import { Reveal } from "@/components/animations/reveal";
import { Particles } from "@/components/animations/particles";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";
import { EVENT } from "@/lib/constants";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Warm gold horizon rising from the base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 118% at 120% 50%, rgba(247,160,70,0.22) 0%, rgba(226,106,23,0.08) 38%, transparent 68%), #f6f3ec",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[34vw] w-[80vw] -translate-x-1/2 animate-breathe blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(247,160,70,0.2), transparent 72%)",
        }}
      />
      <Particles count={20} seed={77213} className="z-[1]" />

      <div className="shell section-y relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center" withRule={false}>
              {EVENT.dates.label} · {EVENT.venue.cityShort}
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display-1 mt-9 text-balance">
              <span className="text-cream">Become the entrepreneur </span>
              <span className="text-gold-gradient">
                your calling requires.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="text-lead mx-auto mt-9 max-w-xl text-pretty text-cream-dim">
              <p>Build with purpose.</p>
              <p className="mt-1.5">Lead with authority.</p>
              <p className="mt-1.5">
                Create a legacy that extends beyond profit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="#register" variant="gold" size="lg">
                Register For Free
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
              <Button href={`mailto:${EVENT.email}`} variant="ghost" size="lg">
                Partner With Us
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <p className="text-label mt-10 uppercase text-cream-faint">
              {EVENT.admission} · Confirmed by email
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
