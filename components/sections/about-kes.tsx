import { Reveal } from "@/components/animations/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { ABOUT_KES } from "@/lib/site-content";

const PURPOSES = [
  { label: "Our Vision", copy: ABOUT_KES.vision },
  { label: "Our Mission", copy: ABOUT_KES.mission },
] as const;

export function AboutKes() {
  return (
    <section
      id="sovereign"
      className="theme-light relative overflow-hidden bg-white section-y"
    >
      <div className="shell">
        <SectionIntro eyebrow="About KES" title="Built on one mandate" />

        <Reveal delay={0.12}>
          <p className="font-heading mx-auto mt-5 max-w-[700px] text-center text-[clamp(1.1rem,2.3vw,1.28rem)] font-bold leading-[1.65] text-[#061a5b]">
            {ABOUT_KES.mandate}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[920px] gap-4 md:grid-cols-2">
          {PURPOSES.map((purpose, index) => (
            <Reveal key={purpose.label} delay={0.16 + index * 0.08}>
              <article className="h-full rounded-[18px] border border-[#d9dbe3] bg-[#f8f6f0] p-7 text-left">
                <p className="font-heading text-label uppercase text-gold-600">
                  {purpose.label}
                </p>
                <p className="mt-3 text-base leading-[1.7] text-[#5f6578]">
                  {purpose.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
