import { Reveal } from "@/components/animations/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { JOURNEY } from "@/lib/site-content";

export function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-charcoal-950 section-y"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,167,44,0.13),transparent_44%)]"
      />
      <div className="shell relative z-10">
        <SectionIntro
          eyebrow="The Journey"
          title="Six years in the making"
          description="From the maiden edition to The Sovereign Entrepreneur, every KES gathering has carried the mandate forward."
        />

        <div className="mx-auto mt-16 max-w-4xl">
          {JOURNEY.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.07}>
              <article
                className={`grid gap-4 border-t border-white/12 px-4 py-7 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:px-6 ${
                  "current" in milestone && milestone.current
                    ? "rounded-card border border-gold-400/25 bg-gold-400/8"
                    : ""
                }`}
              >
                <p className="text-3xl font-bold tracking-[-0.05em] text-gold-300">
                  {milestone.year}
                </p>
                <div>
                  <h3 className="text-xl font-bold tracking-[-0.025em] text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-cream-dim">
                    {milestone.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-white/12" />
        </div>
      </div>
    </section>
  );
}
