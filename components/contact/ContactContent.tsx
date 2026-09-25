"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { CalEmbed } from "@/components/contact/CalEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

export function ContactContent() {
  const { t } = useT();
  const c = t.contact;

  return (
    <div className="mx-auto max-w-canvas px-5 py-16 md:px-8 md:py-24">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.desc} />

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — form */}
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface/40 p-6 md:p-8">
            <h2 className="font-sora text-xl font-semibold">{c.sendTitle}</h2>
            <p className="mt-1 text-sm text-primary/55">{c.sendDesc}</p>
            <div className="mt-6">
              <ContactForm />
            </div>

            <div className="mt-8 border-t border-border pt-6 text-sm text-primary/60">
              <p>
                {c.preferEmail}{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-accent hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <p className="mt-2">
                {c.phoneLabel}{" "}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-mono text-accent hover:underline"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right — booking */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-surface/40 p-6 md:p-8">
            <h2 className="font-sora text-xl font-semibold">{c.bookTitle}</h2>
            <p className="mt-1 text-sm text-primary/55">{c.bookDesc}</p>
            <div className="mt-6">
              <CalEmbed />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
