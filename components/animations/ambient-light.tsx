import { cn } from "@/lib/utils";

/**
 * Abstract flowing light shapes + film grain.
 * Pure CSS, no JS — renders on the server and costs nothing to hydrate.
 */
export function AmbientLight({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "subtle" | "royal";
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base atmospheric gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "royal"
              ? "radial-gradient(120% 90% at 50% 0%, #1c1c42 0%, transparent 58%), linear-gradient(180deg, #070718 0%, #0b0b21 100%)"
              : "linear-gradient(180deg, #070718 0%, #0b0b21 46%, #070718 100%)",
        }}
      />

      {variant === "hero" && (
        <>
          {/* Deep orange wash — upper left */}
          <div
            className="absolute -top-[26%] -left-[14%] h-[62vw] w-[62vw] animate-drift-slow rounded-full opacity-70 blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(251,139,60,0.34), rgba(226,106,23,0.13) 55%, transparent 78%)",
            }}
          />
          {/* KES orange core — the focal light behind the headline */}
          <div
            className="absolute top-[8%] left-[26%] h-[42vw] w-[42vw] animate-breathe rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(247,148,29,0.3), rgba(247,148,29,0.08) 52%, transparent 76%)",
            }}
          />
          {/* Royal blue counterweight — lower right */}
          <div
            className="absolute -bottom-[24%] -right-[10%] h-[56vw] w-[56vw] animate-drift-slower rounded-full opacity-80 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(58,73,201,0.5), rgba(42,52,150,0.22) 55%, transparent 78%)",
            }}
          />
          {/* Sweeping light ribbon */}
          <div
            className="absolute top-[34%] -left-[10%] h-[34vw] w-[120%] animate-drift-slower opacity-45 blur-[90px]"
            style={{
              background:
                "linear-gradient(102deg, transparent 0%, rgba(253,181,81,0.15) 34%, rgba(84,104,232,0.14) 62%, transparent 88%)",
              transform: "rotate(-7deg)",
            }}
          />
        </>
      )}

      {variant === "subtle" && (
        <>
          <div
            className="absolute -top-[18%] right-[4%] h-[46vw] w-[46vw] animate-drift-slower rounded-full opacity-55 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(247,148,29,0.2), transparent 72%)",
            }}
          />
          <div
            className="absolute -bottom-[20%] -left-[8%] h-[44vw] w-[44vw] animate-drift-slow rounded-full opacity-50 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(58,73,201,0.34), transparent 72%)",
            }}
          />
        </>
      )}

      {/* Film grain — kills gradient banding, adds analog depth */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette — focuses the eye toward the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 42%, transparent 42%, rgba(4,4,14,0.42) 78%, rgba(4,4,14,0.74) 100%)",
        }}
      />
    </div>
  );
}
