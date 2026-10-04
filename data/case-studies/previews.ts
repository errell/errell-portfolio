import type { CaseStudy } from "@/types/case-study";

/** Card fields only. Safe to import from client components. Full studies stay server-side. */
export type CaseStudyPreview = Pick<
  CaseStudy,
  | "slug"
  | "number"
  | "title"
  | "subtitle"
  | "industry"
  | "timeline"
  | "team"
  | "tags"
  | "heroMetrics"
  | "previewMetrics"
>;

export const digitalOnboardingPreview: CaseStudyPreview = {
  slug: "digital-onboarding",
  number: "01",
  title: "Zero-Queue Digital Account Opening",
  subtitle:
    "A BSP-compliant eKYC onboarding flow that moves account opening from a 90-minute branch visit to under 6 minutes on a budget Android phone.",
  industry: "Retail Banking",
  timeline: "16 Weeks · 4 Sprints",
  team: "1 UX Lead, 2 UX Designers, 1 Researcher, 1 Content Designer",
  tags: ["Banking", "Fintech"],
  heroMetrics: [
    {
      value: "58%",
      label: "Drop-off rate",
      tooltip: "Share of users who start but don’t finish the onboarding flow.",
      baseline: "abandonment reduced",
      direction: "down",
      countTo: 58,
      suffix: "%",
      icon: "trend-down",
    },
    {
      value: "5.8 min",
      label: "Avg. completion",
      tooltip: "Average time from start to a successfully opened digital account.",
      baseline: "vs. 90 min branch",
      countTo: 5.8,
      suffix: " min",
      decimals: 1,
      icon: "clock",
    },
    {
      value: "4.7/5.0",
      label: "CSAT",
      tooltip: "Customer Satisfaction score from post-flow surveys (typically 1–5).",
      baseline: "target 4.5",
      countTo: 4.7,
      suffix: "/5.0",
      decimals: 1,
      icon: "star",
    },
    {
      value: "91%",
      label: "First-attempt ID capture",
      tooltip: "Share of eKYC ID photos accepted on the first try without retakes.",
      baseline: "vs. 34% baseline",
      countTo: 91,
      suffix: "%",
      icon: "check",
    },
  ],
  previewMetrics: [
    {
      value: "58%",
      label: "Drop-off reduction",
      tooltip: "How much abandonment fell after the redesigned flow shipped.",
      direction: "down",
    },
    {
      value: "5.8 min",
      label: "Avg. completion time",
      tooltip: "Average minutes to finish digital account opening end-to-end.",    },
  ],
};

export const uitfInvestmentPreview: CaseStudyPreview = {
  slug: "uitf-investment",
  number: "02",
  title: "Mobile-First UITF Investment Platform",
  subtitle:
    "Turning first-time savers into first-time investors by reframing a compliance form as a guided conversation — and 'UITF' as a goal you can picture.",
  industry: "Wealth & Investments",
  timeline: "20 Weeks · 5 Sprints",
  team: "1 UX Lead, 2 UX Designers, 1 Researcher, 1 Financial Content Specialist",
  tags: ["Banking", "Wealth", "Fintech"],
  heroMetrics: [
    {
      value: "+142%",
      label: "New UITF investors",
      tooltip: "First-time customers who invested in a Unit Investment Trust Fund via the product.",
      baseline: "vs. prior year",
      direction: "up",
      countTo: 142,
      prefix: "+",
      suffix: "%",
      icon: "trend-up",
    },
    {
      value: "₱2.1B",
      label: "New AUM",
      tooltip: "Assets Under Management — total customer money invested through the product.",
      baseline: "within 6 months",
      countTo: 2.1,
      prefix: "₱",
      suffix: "B",
      decimals: 1,
      icon: "peso",
    },
    {
      value: "91%",
      label: "Task success rate",
      tooltip: "Share of usability-test participants who completed the primary investment task.",
      countTo: 91,
      suffix: "%",
      icon: "check",
    },
    {
      value: "44%",
      label: "Fewer support tickets",
      tooltip: "Reduction in UITF-related help requests after the redesign.",
      baseline: "UITF-related",
      direction: "down",
      countTo: 44,
      suffix: "%",
      icon: "trend-down",
    },
  ],
  previewMetrics: [
    {
      value: "₱2.1B",
      label: "New AUM in 6 months",
      tooltip: "Assets Under Management — customer money invested in the first six months.",    },
    {
      value: "+142%",
      label: "New UITF investors",
      tooltip: "First-time customers who invested in a Unit Investment Trust Fund via the product.",
      direction: "up",
    },
  ],
};

export const paymentsHubPreview: CaseStudyPreview = {
  slug: "payments-hub",
  number: "03",
  title: "Unified Payments & Transfer Hub",
  subtitle:
    "Collapsing seven tangled payment paths into one confident flow — built around 'who am I paying?' instead of 'which rail?' — ahead of the QR Ph v2.0 launch.",
  industry: "Payments",
  timeline: "14 Weeks · 3.5 Sprints",
  team: "1 UX Lead, 3 UX Designers, 1 Content Designer, 1 Accessibility Specialist",
  tags: ["Payments", "Banking", "Fintech"],
  heroMetrics: [
    {
      value: "71%",
      label: "Payment error rate",
      tooltip: "Share of payment attempts that failed due to user or input mistakes.",
      baseline: "19% → 5.5%",
      direction: "down",
      countTo: 71,
      suffix: "%",
      icon: "trend-down",
    },
    {
      value: "68%",
      label: "Fewer support calls",
      tooltip: "Reduction in hotline volume about failed or confusing payments.",
      baseline: "45K → 14.4K/mo",
      direction: "down",
      countTo: 68,
      suffix: "%",
      icon: "trend-down",
    },
    {
      value: "₱12.2M",
      label: "Monthly savings",
      tooltip: "Estimated monthly support-cost savings from fewer payment-related calls.",
      baseline: "support cost",
      countTo: 12.2,
      prefix: "₱",
      suffix: "M",
      decimals: 1,
      icon: "peso",
    },
    {
      value: "3×",
      label: "QR Ph adoption",
      tooltip: "Share of users paying via QR Ph, the Philippines’ national QR payment standard.",
      baseline: "8% → 24%",
      direction: "up",
      countTo: 3,
      suffix: "×",
      icon: "trend-up",
    },
  ],
  previewMetrics: [
    {
      value: "71%",
      label: "Error rate reduction",
      tooltip: "How much the payment error rate fell after the unified hub shipped.",
      direction: "down",
    },
    {
      value: "₱12.2M",
      label: "Monthly support savings",
      tooltip: "Estimated monthly support-cost savings from fewer payment-related calls.",    },
  ],
};

export const caseStudyPreviews: CaseStudyPreview[] = [
  digitalOnboardingPreview,
  uitfInvestmentPreview,
  paymentsHubPreview,
];
