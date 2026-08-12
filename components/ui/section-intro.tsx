import { Reveal } from "@/components/animations/reveal";
import { Eyebrow, Lead, SectionTitle } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export function SectionIntro({
  eyebrow,
  title,
  description,
  centered = true,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <Eyebrow
          className={centered ? "justify-center" : undefined}
          withRule={!centered}
        >
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SectionTitle className="mt-3">{title}</SectionTitle>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <Lead className={cn("mt-4", centered && "mx-auto max-w-2xl")}>
            {description}
          </Lead>
        </Reveal>
      )}
    </div>
  );
}
