"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import kesLogo from "@/public/kes-logo-2026.png";
import { motion, useReducedMotion } from "motion/react";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal-950/88 backdrop-blur-xl border-b border-white/10 shadow-lift"
          : "bg-transparent",
      )}
    >
      <div className="shell">
        <div className="flex h-20 items-center justify-between lg:h-24">
          {/* Logo */}
          <a href="#top" className="group flex items-center">
            <Image
              src={kesLogo}
              alt={EVENT.name}
              className="h-10 w-auto transition-opacity duration-300 group-hover:opacity-80 sm:h-12 lg:h-14"
              preload
            />
          </a>

          {/* Nav */}
          {/* <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-field px-4 py-2 text-[0.9375rem] font-medium text-cream-dim transition-colors duration-300 hover:bg-white/8 hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </nav> */}

          {/* CTA */}
          <Button href="#register" variant="gold" size="md">
            <span className="hidden sm:inline">Register Free</span>
            <span className="sm:hidden">Register</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
