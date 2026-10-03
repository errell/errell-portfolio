"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { Button } from "@/components/ui/Button";
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
    <header className="no-print sticky top-0 z-50 border-b border-border bg-canvas/55 backdrop-blur-md">
      <nav aria-label="Primary" className="shell flex h-16 items-center gap-4">
        <Link href="/" className="flex min-w-0 items-baseline gap-2">
          <span className="truncate font-display text-xl font-semibold tracking-tight">
            {site.name}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:inline">
            UX
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors duration-150",
                  active
                    ? "text-primary underline decoration-1 underline-offset-[6px]"
                    : "text-primary/65 hover:text-primary",
                )}
              >
                {labelFor(link.href)}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <LangToggle />
          <ThemeToggle />
          <Button href="/contact" className="hidden h-9 px-3.5 text-sm sm:inline-flex">
            {t.nav.contact}
          </Button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-2xl border border-border text-primary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-150",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity duration-150",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-150",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-canvas md:hidden">
          <div className="shell flex flex-col gap-1 py-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "px-1 py-2.5 text-sm",
                    active ? "text-primary" : "text-primary/70",
                  )}
                >
                  {labelFor(link.href)}
                </Link>
              );
            })}
            <Button href="/contact" className="mt-2 sm:hidden">
              {t.nav.contact}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
