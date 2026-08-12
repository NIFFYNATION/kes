import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { RUNNING_ORDER } from "@/lib/site-content";

export function RunningOrder() {
  return (
    <section className="theme-light bg-[#f8f6f0] section-y">
      <div className="shell">
        <SectionIntro
          eyebrow="Running Order"
          title="The day, in sequence"
          description="Five core segments, each earning its place on the schedule."
        />

        <Stagger className="mx-auto mt-10 max-w-[920px] space-y-3" stagger={0.06}>
          {RUNNING_ORDER.map((item) => {
            const featured = "featured" in item && item.featured;
            return (
              <StaggerItem key={item.number}>
                <article
                  className={`grid gap-4 rounded-[16px] border p-5 sm:grid-cols-[60px_1fr_auto] sm:items-start sm:gap-[18px] sm:p-6 ${
                    featured
                      ? "border-gold-300/20 bg-[linear-gradient(145deg,#07184e,#020a31)]"
                      : "border-[#d9dbe3] bg-white"
                  }`}
                >
                  <p
                    className={`font-display text-[1.7rem] tracking-[0.03em] ${
                      featured ? "text-gold-300" : "text-gold-700"
                    }`}
                  >
                    {item.number}
                  </p>
                  <div>
                    <h3
                      className={`font-heading text-[1.08rem] font-bold ${
                        featured ? "text-white" : "text-cream"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-[1.6] text-cream-dim">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`font-heading w-fit rounded-full px-3 py-2 text-[0.64rem] font-black uppercase tracking-[0.08em] ${
                      featured
                        ? "bg-gold-400/10 text-gold-300"
                        : "bg-gold-500/10 text-gold-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
