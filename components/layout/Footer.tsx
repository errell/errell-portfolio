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
    <footer className="border-t border-border bg-canvas">
      <div className="mx-auto max-w-canvas px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-sora text-lg font-semibold tracking-tight"
            >
              {site.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-primary/60">
              {t.footer.tagline}
            </p>
            <p className="mt-4 font-mono text-xs text-primary/40">
              {site.location}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/40">
                {t.footer.explore}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary/70 transition-colors hover:text-accent"
                    >
                      {labelFor(link.href)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/40">
                {t.footer.connect}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/70 transition-colors hover:text-accent"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={site.credly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/70 transition-colors hover:text-accent"
                  >
                    Credly
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-primary/70 transition-colors hover:text-accent"
                  >
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/40">
                {t.footer.getInTouch}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="font-mono text-xs text-primary/70 transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="font-mono text-xs text-primary/70 transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-primary/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
