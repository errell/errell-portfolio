import type { CaseStudy } from "@/types/case-study";
import { digitalOnboarding } from "./digital-onboarding";
import { uitfInvestment } from "./uitf-investment";
import { paymentsHub } from "./payments-hub";

// Ordered 01 → 02 → 03. This order drives prev/next navigation and listings.
export const caseStudies: CaseStudy[] = [
  digitalOnboarding,
  uitfInvestment,
  paymentsHub,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudyNav(slug: string): {
  prev?: CaseStudy;
  next?: CaseStudy;
} {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? caseStudies[i - 1] : undefined,
    next: i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined,
  };
}

export {
  digitalOnboarding,
  uitfInvestment,
  paymentsHub,
};
