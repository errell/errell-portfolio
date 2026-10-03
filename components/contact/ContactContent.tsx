"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

export function ContactContent() {
  const { t } = useT();
  const c = t.contact;

  return (
    <div className="shell py-20 md:py-28">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.desc} />

      <div className="mt-12 max-w-2xl">
        <Reveal>
          <div className="dt-card p-6 md:p-8">
            <h2 className="font-sans text-xl font-medium tracking-tight">{c.sendTitle}</h2>
            <p className="mt-1 text-sm text-muted">{c.sendDesc}</p>
            <div className="mt-6">
              <ContactForm />
            </div>

            <div className="mt-8 border-t border-border pt-6 text-sm text-muted">
              <p>
                {c.preferEmail}{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-link hover:underline"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
