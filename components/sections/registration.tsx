import { Reveal } from "@/components/animations/reveal";
import { RegistrationForm } from "@/components/sections/registration-form";
import { Eyebrow } from "@/components/ui/typography";
import { EVENT } from "@/lib/constants";

export function Registration() {
  return (
    <section
      id="register"
      className="theme-light relative scroll-mt-24 overflow-hidden bg-[#f8f6f0]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 34% at 87% 0%, rgba(214,166,47,0.09), transparent 68%), #f8f6f0",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-16 hidden h-96 w-96 rounded-full border border-gold-500/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-32 hidden h-64 w-64 rounded-full border border-gold-500/20"
      />

      <div className="shell relative z-10 py-20 lg:py-24">
        <div className="mx-auto max-w-[820px] text-center">
          <div>
            <Reveal>
              <Eyebrow className="justify-center" withRule={false}>
                Registration is free
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-3 text-[clamp(2.55rem,5vw,3.25rem)] uppercase leading-[0.98] tracking-[0.03em] text-cream">
                Your seat is waiting
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-[720px] text-base leading-7 text-cream-dim sm:text-lg">
                Founders, builders and faith-driven leaders, all in one place
                for a focused day of learning, alignment and Kingdom-minded growth.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid gap-3 text-center md:grid-cols-3">
                <div className="rounded-[18px] border border-[#d9dbe3] bg-white px-5 py-6 md:min-h-[132px]">
                  <dt className="font-heading text-label uppercase text-gold-600">When</dt>
                  <dd className="font-heading mt-2 text-[0.93rem] font-bold leading-[1.45] text-cream">
                    {EVENT.dates.full}
                  </dd>
                </div>
                <div className="rounded-[18px] border border-[#d9dbe3] bg-white px-5 py-6 md:min-h-[132px]">
                  <dt className="font-heading text-label uppercase text-gold-600">Where</dt>
                  <dd className="font-heading mt-2 text-[0.93rem] font-bold leading-[1.45] text-cream">
                    {EVENT.venue.full}
                  </dd>
                </div>
                <div className="rounded-[18px] border border-[#d9dbe3] bg-white px-5 py-6 md:min-h-[132px]">
                  <dt className="font-heading text-label uppercase text-gold-600">Access</dt>
                  <dd className="font-heading mt-2 text-[0.93rem] font-bold leading-[1.45] text-cream">
                    Free with registration
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="mx-auto mt-8 max-w-[600px] text-left">
            <Reveal delay={0.1}>
              <RegistrationForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
