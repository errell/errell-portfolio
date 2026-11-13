import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudy,
  getCaseStudyNav,
  getShowcaseStudy,
  showcaseStudies,
} from "@/data/case-studies";
import { CaseStudyContent } from "@/components/case-study/CaseStudyContent";
import { ShowcaseContent } from "@/components/case-study/ShowcaseContent";
import { CaseStudyGate } from "@/components/case-study/CaseStudyGate";
import { isCaseStudyUnlocked } from "@/lib/case-study-gate";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return [...caseStudies, ...showcaseStudies].map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug) ?? getShowcaseStudy(params.slug);
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
  const showcase = getShowcaseStudy(params.slug);
  if (showcase) {
    if (!isCaseStudyUnlocked()) {
      return <CaseStudyGate slug={showcase.slug} />;
    }
    const last = caseStudies[caseStudies.length - 1];
    return (
      <ShowcaseContent
        study={showcase}
        prev={last ? { slug: last.slug, number: last.number } : undefined}
      />
    );
  }

  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  if (!isCaseStudyUnlocked()) {
    return <CaseStudyGate slug={study.slug} />;
  }

  const { prev, next } = getCaseStudyNav(study.slug);

  return (
    <CaseStudyContent
      study={study}
      prev={prev ? { slug: prev.slug, number: prev.number } : undefined}
      next={next ? { slug: next.slug, number: next.number } : undefined}
    />
  );
}
