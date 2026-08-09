import { Reveal } from "@/components/animations/reveal";
import { RegistrationForm } from "@/components/sections/registration-form";
import { Eyebrow } from "@/components/ui/typography";
import { EVENT } from "@/lib/constants";

export function Registration() {
  return (
    <section
      id="register"
      className="theme-light relative scroll-mt-24 overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 80% at 8% 45%, rgba(212,167,44,0.13), transparent 68%), linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full border border-gold-500/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-32 h-64 w-64 rounded-full border border-gold-500/20"
      />

      <div className="shell relative z-10 py-24 lg:py-32">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <Reveal>
              <Eyebrow>Registration is free</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 text-[clamp(2.75rem,5vw,5rem)] font-bold leading-[0.96] tracking-[-0.05em] text-cream">
                Your seat is waiting.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-lg text-lg leading-8 text-cream-dim sm:text-xl">
                Join founders, builders, and faith-driven leaders for one
                focused day of ideas, conviction, and practical momentum.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
                <div className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr]">
                  <dt className="text-label uppercase text-gold-700">When</dt>
                  <dd className="text-base font-semibold text-cream sm:text-lg">
                    {EVENT.dates.full}
                  </dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr]">
                  <dt className="text-label uppercase text-gold-700">Where</dt>
                  <dd className="text-base font-semibold leading-7 text-cream sm:text-lg">
                    {EVENT.venue.full}
                  </dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr]">
                  <dt className="text-label uppercase text-gold-700">Access</dt>
                  <dd className="text-base font-semibold text-cream sm:text-lg">
                    Free with registration
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <RegistrationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
