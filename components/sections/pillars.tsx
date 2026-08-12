import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { PILLARS } from "@/lib/site-content";

export function Pillars() {
  return (
    <section
      id="pillars"
      className="relative overflow-hidden bg-[linear-gradient(145deg,#07184e,#020a31)] section-y"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(10,42,125,0.18),transparent_52%)]"
      />
      <div className="shell relative z-10">
        <SectionIntro eyebrow="Pillars" title="What KES is built on" />

        <Stagger className="mx-auto mt-10 grid max-w-[1120px] gap-4 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.number}>
              <article className="group h-full rounded-[18px] border border-white/12 bg-white/[0.05] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold-300/40">
                <p className="font-heading text-xs font-black tracking-[0.1em] text-gold-300">
                  {pillar.number}
                </p>
                <h3 className="font-display mt-2 text-[1.7rem] uppercase leading-[0.95] tracking-[0.03em] text-gold-300">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.65] text-white/70">
                  {pillar.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
