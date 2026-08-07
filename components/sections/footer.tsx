import Image from "next/image";
import { EVENT, NAV_LINKS } from "@/lib/constants";

const SOCIALS = [
  { label: "Instagram", href: EVENT.social.instagram },
  { label: "LinkedIn", href: EVENT.social.linkedin },
  { label: "X", href: EVENT.social.x },
  { label: "YouTube", href: EVENT.social.youtube },
];

export function Footer() {
  return (
    <footer className="relative border-t border-cream/8 bg-charcoal-950"
    style={{
          background:
            "radial-gradient(130% 100% at 50% 0%, rgba(90,110,220,0.14) 0%, transparent 62%), linear-gradient(180deg, #f6f3ec, #e9e3f2 48%, #f6f3ec)",
        }}>
      <div className="shell py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Image
              src="/keslogo.png"
              alt={EVENT.name}
              width={384}
              height={128}
              className="h-12 w-auto"
            />
            <p className="text-label mt-5 uppercase text-gold-500/70">
              {EVENT.theme}
            </p>
            <p className="mt-5 max-w-sm leading-relaxed text-cream-faint">
              {EVENT.description}
            </p>
              
            <a
              href={`mailto:${EVENT.email}`}
              className="mt-7 inline-block text-sm text-cream-dim underline-offset-4 transition-colors duration-300 hover:text-gold-600 hover:underline"
            >
              {EVENT.email}
            </a>
          <p
              className="mt-3 text-sm text-cream-dim underline-offset-4 transition-colors duration-300 hover:text-gold-600 hover:underline"
            >
              Tel: {EVENT.phone}
            </p>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-3 lg:col-start-7">
            <p className="text-label mb-6 uppercase text-cream-faint">
              Navigate
            </p>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream-dim transition-colors duration-300 hover:text-gold-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Follow */}
          <div className="lg:col-span-2 lg:col-start-11">
            <p className="text-label mb-6 uppercase text-cream-faint">Follow</p>
            <ul className="space-y-4">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-dim transition-colors duration-300 hover:text-gold-600"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-cream/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream-faint">
            © {EVENT.year} {EVENT.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream-faint">
            {EVENT.venue.full} · {EVENT.dates.label}
          </p>
        </div>
      </div>
    </footer>
  );
}
