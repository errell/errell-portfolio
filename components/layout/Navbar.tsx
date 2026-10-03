"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useT();
  const [open, setOpen] = useState(false);

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
    <>
      <aside className="site-rail no-print fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-railBorder bg-rail text-railText md:flex">
        <Link
          href="/"
          className="px-6 pb-2 pt-8 font-sora text-lg font-semibold tracking-tight text-railText"
        >
          {site.name}
        </Link>
        <p className="px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-railMuted">
          {site.location}
        </p>

        <nav aria-label="Primary" className="mt-10 flex flex-1 flex-col gap-1 px-3">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg border-l-2 px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-railMuted hover:text-railText",
                )}
              >
                {labelFor(link.href)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 px-5 pb-6">
          <LangToggle tone="rail" />
          <ThemeToggle tone="rail" />
        </div>
      </aside>

      <header className="site-mobile-nav no-print sticky top-0 z-50 border-b border-border bg-canvas md:hidden">
        <nav
          aria-label="Primary"
          className="flex h-16 items-center justify-between px-5"
        >
          <Link
            href="/"
            className="font-sora text-base font-semibold tracking-tight"
          >
            {site.name}
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-150",
                    open && "translate-y-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-150",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-150",
                    open && "-translate-y-[7px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-canvas">
            <div className="flex flex-col gap-1 px-3 py-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg border-l-2 px-4 py-3 text-base font-medium",
                      active
                        ? "border-accent text-accent"
                        : "border-transparent text-primary/80",
                    )}
                  >
                    {labelFor(link.href)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
