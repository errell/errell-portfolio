"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const labelFor = (href: string) => {
    if (href === "/work") return t.nav.work;
    if (href === "/about") return t.nav.about;
    if (href === "/resume") return t.nav.resume;
    if (href === "/contact") return t.nav.contact;
    return href;
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border glass"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-canvas items-center justify-between px-5 md:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-sora text-lg font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
            EN
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-accent"
                  : "text-primary/70 hover:text-primary",
              )}
            >
              {labelFor(link.href)}
            </Link>
          ))}
          <div className="mx-2 flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
          <Button href="/contact" size="md">
            {t.nav.hireMe}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-primary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform",
                  open && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform",
                  open && "-translate-y-[7px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border glass md:hidden">
          <div className="mx-auto flex max-w-canvas flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium",
                  isActive(link.href)
                    ? "bg-surface text-accent"
                    : "text-primary/80 hover:bg-surface",
                )}
              >
                {labelFor(link.href)}
              </Link>
            ))}
            <Button href="/contact" className="mt-2 w-full">
              {t.nav.hireMe}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
