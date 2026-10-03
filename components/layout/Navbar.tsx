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

  const linkClass = (active: boolean) =>
    cn(
      "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-[rgb(123_104_238/0.18)] text-white shadow-[inset_3px_0_0_#7B68EE]"
        : "text-railMuted hover:bg-white/5 hover:text-railText",
    );

  const navItems = (
    <nav aria-label="Primary" className="flex flex-col gap-0.5">
      {navLinks.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={linkClass(active)}
          >
            {labelFor(link.href)}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <header className="no-print sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-railBorder bg-rail px-4 text-railText md:hidden">
        <Link href="/" className="min-w-0 truncate text-sm font-semibold tracking-tight">
          {site.name}
        </Link>
        <button
          type="button"
          className="ml-auto grid h-9 w-9 place-items-center rounded-full text-railText"
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
      </header>

      {open && (
        <div className="no-print fixed inset-x-0 top-14 z-50 border-b border-railBorder bg-rail px-3 py-3 text-railText md:hidden">
          {navItems}
          <div className="mt-3 flex items-center gap-2 border-t border-railBorder pt-3">
            <LangToggle tone="rail" />
            <ThemeToggle tone="rail" />
          </div>
        </div>
      )}

      <aside className="no-print fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-railBorder bg-rail text-railText md:flex">
        <div className="px-5 pb-4 pt-5">
          <Link href="/" className="block text-[15px] font-semibold tracking-tight text-railText">
            {site.name}
          </Link>
          <p className="mt-0.5 text-xs text-railMuted">UX</p>
        </div>
        <div className="flex-1 px-2">{navItems}</div>
        <div className="flex items-center gap-2 border-t border-railBorder px-3 py-3">
          <LangToggle tone="rail" />
          <ThemeToggle tone="rail" />
        </div>
      </aside>
    </>
  );
}
