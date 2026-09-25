"use client";

import { Button } from "@/components/ui/Button";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { skillCategories } from "@/data/skills";
import { toolCategories } from "@/data/tools";
import { site } from "@/data/site";
import { useT } from "@/lib/i18n";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-border pb-1 font-sora text-sm font-bold uppercase tracking-wider text-accent print:border-gray-300 print:text-black">
      {children}
    </h2>
  );
}

export function ResumeContent() {
  const { t } = useT();
  const r = t.resume;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
      {/* Actions — hidden on print */}
      <div className="no-print mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-sora text-2xl font-bold">{r.title}</h1>
          <p className="mt-1 text-sm text-primary/50">
            {r.note}{" "}
            <a href="/work" className="text-accent hover:underline">
              /work
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="/errell-nino-cv.pdf" size="md">
            {r.download}
          </Button>
        </div>
      </div>

      {/* Resume document */}
      <article className="print-container rounded-2xl border border-border bg-surface/40 p-8 print-surface md:p-12">
        <header className="border-b border-border pb-6 print:border-gray-300">
          <h1 className="font-sora text-3xl font-bold tracking-tight print:text-black">
            {site.name}
          </h1>
          <p className="mt-1 text-lg text-primary/80 print:text-black">
            {r.roleLine}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-primary/60 print:text-gray-700">
            <span>{site.location}</span>
            <span>{site.email}</span>
            <span>{site.phone}</span>
            <span>linkedin.com/in/e-nino</span>
          </p>
        </header>

        <section className="mt-8">
          <SectionTitle>{r.sections.summary}</SectionTitle>
          <p className="text-sm leading-relaxed text-primary/75 print:text-gray-800">
            {r.summaryBody}
          </p>
        </section>

        <section className="mt-8">
          <SectionTitle>{r.sections.competencies}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((cat, i) => (
              <div key={cat.title}>
                <p className="text-xs font-semibold text-primary/80 print:text-black">
                  {t.home.skillTitles[i] ?? cat.title}
                </p>
                <p className="mt-1 text-sm text-primary/65 print:text-gray-800">
                  {cat.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle>{r.sections.experience}</SectionTitle>
          <div className="space-y-5">
            {experience.map((e) => (
              <div key={e.period + e.role}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-sora text-base font-semibold text-primary print:text-black">
                    {e.role}
                  </h3>
                  <span className="font-mono text-xs text-primary/50 print:text-gray-600">
                    {e.period}
                  </span>
                </div>
                <p className="text-sm text-primary/70 print:text-gray-700">
                  {e.org}
                  {e.context ? ` · ${e.context}` : ""}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-primary/65 print:text-gray-800">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle>{r.sections.achievements}</SectionTitle>
          <ul className="list-disc space-y-1 pl-5 text-sm text-primary/70 print:text-gray-800">
            {r.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <SectionTitle>{r.sections.education}</SectionTitle>
          <p className="text-sm text-primary/70 print:text-gray-800">
            {r.educationBody}
          </p>
        </section>

        <section className="mt-8">
          <SectionTitle>{r.sections.certifications}</SectionTitle>
          <ul className="grid gap-1 text-sm text-primary/70 sm:grid-cols-2 print:text-gray-800">
            {certifications.map((cert) => (
              <li key={cert.name}>
                {cert.name}{" "}
                <span className="text-primary/40">— {cert.issuer}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <SectionTitle>{r.sections.tools}</SectionTitle>
          <div className="space-y-1.5">
            {toolCategories.map((cat) => (
              <p
                key={cat.title}
                className="text-sm text-primary/65 print:text-gray-800"
              >
                <span className="font-semibold text-primary/80 print:text-black">
                  {cat.title}:
                </span>{" "}
                {cat.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
