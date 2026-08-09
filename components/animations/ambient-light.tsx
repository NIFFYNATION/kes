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
              ? "radial-gradient(120% 90% at 50% 0%, #123a73 0%, transparent 58%), linear-gradient(180deg, #031633 0%, #061d45 100%)"
              : "linear-gradient(180deg, #031633 0%, #061d45 52%, #020d21 100%)",
        }}
      />

      {variant === "hero" && (
        <>
          {/* Warm amber wash — upper left */}
          <div
            className="absolute -top-[26%] -left-[14%] h-[62vw] w-[62vw] animate-drift-slow rounded-full opacity-70 blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(233,195,75,0.26), rgba(212,167,44,0.10) 55%, transparent 78%)",
            }}
          />
          {/* KES orange core — the focal light behind the headline */}
          <div
            className="absolute top-[8%] left-[26%] h-[42vw] w-[42vw] animate-breathe rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(233,195,75,0.20), rgba(212,167,44,0.05) 52%, transparent 76%)",
            }}
          />
          {/* Royal blue counterweight — lower right */}
          <div
            className="absolute -bottom-[24%] -right-[10%] h-[56vw] w-[56vw] animate-drift-slower rounded-full opacity-70 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(47,95,159,0.34), rgba(23,66,126,0.14) 55%, transparent 78%)",
            }}
          />
          {/* Sweeping light ribbon */}
          <div
            className="absolute top-[34%] -left-[10%] h-[34vw] w-[120%] animate-drift-slower opacity-45 blur-[90px]"
            style={{
              background:
                "linear-gradient(102deg, transparent 0%, rgba(233,195,75,0.12) 34%, rgba(92,132,196,0.10) 62%, transparent 88%)",
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
                "radial-gradient(closest-side, rgba(233,195,75,0.16), transparent 72%)",
            }}
          />
          <div
            className="absolute -bottom-[20%] -left-[8%] h-[44vw] w-[44vw] animate-drift-slow rounded-full opacity-50 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(47,95,159,0.24), transparent 72%)",
            }}
          />
        </>
      )}

      {/* Film grain — kills gradient banding, adds analog depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette — gentle warm edge to focus the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 42%, transparent 48%, rgba(0,8,28,0.12) 80%, rgba(0,8,28,0.3) 100%)",
        }}
      />
    </div>
  );
}
