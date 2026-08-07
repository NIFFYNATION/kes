import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform disabled:pointer-events-none disabled:opacity-55";

const sizes: Record<Size, string> = {
  md: "h-12 px-7 text-[0.9375rem]",
  lg: "h-[3.75rem] px-9 text-base",
};

const variants: Record<Variant, string> = {
  gold: cn(
    "text-white shadow-gold",
    "bg-[linear-gradient(135deg,var(--color-gold-400)_0%,var(--color-gold-500)_46%,var(--color-bronze-500)_100%)]",
    "hover:-translate-y-0.5 hover:shadow-gold-lg active:translate-y-0 active:scale-[0.985]",
  ),
  ghost: cn(
    "text-cream border border-cream/12 bg-cream/[0.03] backdrop-blur-md",
    "hover:border-gold-500/45 hover:bg-cream/[0.06] hover:-translate-y-0.5 active:translate-y-0",
  ),
  outline: cn(
    "text-cream border border-cream/20",
    "hover:border-gold-500/60 hover:text-gold-600",
  ),
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

export function Button({
  children,
  variant = "gold",
  size = "lg",
  className,
  href,
  ...props
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      {/* Light sweep on hover — the premium micro-interaction */}
      {variant === "gold" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[130%]"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  );
}
