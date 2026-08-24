import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/animations/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { SPEAKERS } from "@/lib/site-content";

type SpeakerPortraitProps = {
  alt: string | null;
  initials: string;
  src: string | null;
};

function SpeakerPortrait({ alt, initials, src }: SpeakerPortraitProps) {
  if (src && alt) {
    return (
      <div className="relative aspect-[12/13] overflow-hidden bg-[#081c5c]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 470px, calc(100vw - 40px)"
          className="object-cover object-[center_25%]"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_28%,#f2cf61_0_12%,transparent_12.5%),radial-gradient(ellipse_at_50%_110%,rgba(242,207,97,0.8)_0_38%,transparent_38.5%),linear-gradient(145deg,#09246b,#020a31)]">
      <span className="sr-only">
        {initials}
      </span>
    </div>
  );
}

export function Speakers() {
  return (
    <section className="theme-light bg-white section-y">
      <div className="shell">
        <SectionIntro
          eyebrow="Featured Voices"
          title="Meet the people shaping the room"
          description="Marketplace insight, Kingdom perspective, worship, and practical experience come together at KES 2026."
        />

        <Stagger className="mx-auto mt-10 grid max-w-[960px] gap-5 md:grid-cols-2">
          {SPEAKERS.map((speaker) => (
            <StaggerItem key={speaker.name}>
              <article
                className={`h-full overflow-hidden rounded-[20px] border ${
                  "featured" in speaker && speaker.featured
                    ? "border-gold-300/20 bg-[#03113f]"
                    : "border-[#d9dbe3] bg-[#f8f6f0]"
                }`}
              >
                <SpeakerPortrait
                  alt={speaker.imageAlt}
                  initials={speaker.initials}
                  src={speaker.image}
                />
                <div className="p-[22px]">
                  <p
                    className={`text-label uppercase ${
                      "featured" in speaker && speaker.featured
                        ? "text-gold-300"
                        : "text-gold-700"
                    }`}
                  >
                    {speaker.role}
                  </p>
                  <h3
                    className={`font-heading mt-2 text-[1.3rem] font-bold ${
                      "featured" in speaker && speaker.featured
                        ? "text-white"
                        : "text-cream"
                    }`}
                  >
                    {speaker.name}
                  </h3>
                  <p
                    className={`mt-2 text-[0.9rem] font-extrabold ${
                      "featured" in speaker && speaker.featured
                        ? "text-gold-300"
                        : "text-cream"
                    }`}
                  >
                    {speaker.topic}
                  </p>
                  <p
                    className={`mt-3 text-[0.95rem] leading-[1.65] ${
                      "featured" in speaker && speaker.featured
                        ? "text-[#c6cada]"
                        : "text-[#5f6578]"
                    }`}
                  >
                    {speaker.bio}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
