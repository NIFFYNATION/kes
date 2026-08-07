import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------- Eyebrow / label ---------------------------- */

export function Eyebrow({
  children,
  className,
  withRule = true,
}: {
  children: ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      {withRule && (
        <span
          aria-hidden
          className="h-px w-8 bg-[linear-gradient(90deg,transparent,var(--color-gold-500))]"
        />
      )}
      <span className="text-label uppercase text-gold-500">{children}</span>
    </div>
  );
}

/* --------------------------------- Badge --------------------------------- */

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/[0.08] px-4 py-2 backdrop-blur-md",
        "text-label uppercase text-gold-600",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------ Section title ---------------------------- */

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-display-2 text-balance text-cream-gradient",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------- Lead ---------------------------------- */

export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-lead text-pretty text-cream-dim", className)}>
      {children}
    </p>
  );
}

/* --------------------------------- Rule ---------------------------------- */

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hairline", className)} />;
}
