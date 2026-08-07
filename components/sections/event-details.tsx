import { Reveal, Stagger, StaggerItem } from "@/components/animations/reveal";
import { Eyebrow, SectionTitle } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/constants";

function DetailCard({
  label,
  title,
  lines,
}: {
  label: string;
  title: string;
  lines: string[];
}) {
  return (
    <div className="group h-full rounded-panel border border-cream/10 bg-charcoal-900/70 p-9 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-card">
      <p className="text-label uppercase text-gold-500">{label}</p>
      <p className="mt-5 text-2xl font-bold tracking-[-0.03em] text-cream">
        {title}
      </p>
      {lines.map((line) => (
        <p key={line} className="mt-2 text-sm leading-relaxed text-cream-faint">
          {line}
        </p>
      ))}
    </div>
  );
}

export function EventDetails() {
  return (
    <section id="details" className="section-y relative overflow-hidden">
      {/* Soft warm pool behind the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[34vw] w-[70vw] -translate-x-1/2 animate-breathe blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(247,160,70,0.1), transparent 74%)",
        }}
      />

      <div className="shell relative z-10">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Event Details</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionTitle className="mt-7">
              Everything you need to know.
            </SectionTitle>
          </Reveal>
        </div>

        <Stagger className="mt-20 grid gap-5 md:grid-cols-3" stagger={0.1}>
          <StaggerItem>
            <DetailCard
              label="Date"
              title={EVENT.dates.label}
              lines={[EVENT.dates.day]}
            />
          </StaggerItem>
          <StaggerItem>
            <DetailCard
              label="Venue"
              title={EVENT.venue.name}
              lines={[EVENT.venue.street, EVENT.venue.area]}
            />
          </StaggerItem>
          <StaggerItem>
            <DetailCard
              label="Admission"
              title="Free"
              lines={[
                "Free with registration",
                "Confirmed instantly by email",
              ]}
            />
          </StaggerItem>
        </Stagger>

        {/* Closing action for this section */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex justify-center">
            <Button href="#register" variant="gold" size="lg">
              Reserve Your Seat
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
