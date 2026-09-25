import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getCaseStudyNav } from "@/data/case-studies";
import { CaseStudyContent } from "@/components/case-study/CaseStudyContent";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: `${study.title} — Case Study`,
    description: study.subtitle,
    openGraph: {
      title: `${study.title} — ${study.industry} UX Case Study`,
      description: study.subtitle,
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const { prev, next } = getCaseStudyNav(study.slug);

  return (
    <CaseStudyContent
      study={study}
      prev={prev ? { slug: prev.slug, number: prev.number } : undefined}
      next={next ? { slug: next.slug, number: next.number } : undefined}
    />
  );
}
