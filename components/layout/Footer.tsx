"use client";

import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { useT } from "@/lib/i18n";

export function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  const labelFor = (href: string) => {
    if (href === "/work") return t.nav.work;
    if (href === "/about") return t.nav.about;
    if (href === "/resume") return t.nav.resume;
    if (href === "/contact") return t.nav.contact;
    return href;
  };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-canvas px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-sora text-base font-semibold tracking-tight">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">{t.footer.tagline}</p>
            <p className="mt-2 text-sm text-muted">{site.location}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block font-mono text-xs text-primary hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted transition-colors duration-150 hover:text-accent"
              >
                {labelFor(link.href)}
              </Link>
            ))}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-150 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={site.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-150 hover:text-accent"
            >
              Credly
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
