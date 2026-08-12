import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { EVENT } from "@/lib/constants";

export function BuildersCta() {
  return (
    <section className="relative overflow-hidden bg-gold-400 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(3,22,51,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(3,22,51,.25)_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div className="shell relative z-10 text-center">
        <Reveal>
          <h2 className="mx-auto  max-w-5xl text-[clamp(2.9rem,7vw,4.4rem)] font- uppercase leading-[0.99]  text-[#031633]">
            The marketplace is looking for you,
            <span className="mt-2 block text-[#031633]">the builders.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#17345e] sm:text-xl">
            This is the time to build with influence, audacity, and legacy. {EVENT.dates.label}, {EVENT.venue.name}, {EVENT.venue.cityShort}.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10">
            <Button
              href="#register"
              variant="navy"
              size="lg"
            >
              Register Now <span aria-hidden>→</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
