"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EVENT, NAV_LINKS } from "@/lib/constants";
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
          ? "bg-void backdrop-blur-xl border-b border-cream/8 shadow-lift"
          : "bg-transparent",
      )}
    >
      <div className="shell">
        <div className="flex h-20 items-center justify-between lg:h-24">
          {/* Logo */}
          <a href="#top" className="group flex items-center">
            <Image
              src="/keslogo.png"
              alt={EVENT.name}
              width={384}
              height={128}
              className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-80 lg:h-10"
              priority
            />
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-field px-4 py-2 text-sm font-medium text-cream-dim transition-colors duration-300 hover:bg-cream/5 hover:text-gold-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

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
