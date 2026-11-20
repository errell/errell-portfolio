export interface ExperienceCaseStudy {
  slug: string;
  label: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  context?: string;
  points: string[];
  /** Optional case-study links shown under this tenure (About + Resume). */
  caseStudies?: ExperienceCaseStudy[];
}

// Employer names are described by type per confidentiality constraints.
export const experience: ExperienceEntry[] = [
  {
    period: "Mar 2022 – Present",
    role: "UX Design Manager / Project Manager / Squad UX Lead",
    org: "Major Philippine Universal Bank (via Accenture)",
    context: "Digital Banking · Payments",
    points: [
      "Lead UX across 5 concurrent Agile squads delivering eKYC onboarding and a unified payments hub, and mentor 10–15 UX designers.",
      "Part of the early phases of the organisation's enterprise AI platform as a front-line tester and prototype builder; hands-on with Microsoft 365 Copilot Studio and ran AI training rollout sessions.",
      "Use Claude, ChatGPT and Copilot to identify and validate UX use cases and prioritise backlog items; align delivery with BSP, security, brand and WCAG 2.1 AA.",
      "Owned the eKYC account-opening redesign that cut abandonment by 58% and shifted volume out of branches.",
      "Directed the unified payments hub that reduced errors 71% and support costs by ₱12.2M/month.",
    ],
  },
  {
    period: "Nov 2020 – Nov 2021",
    role: "UX Design Manager / Project Manager",
    org: "Global Professional Services Firm (EY)",
    context: "Enterprise Consulting",
    points: [
      "Led enterprise UX engagements for banking and financial-services clients.",
      "Built and mentored cross-functional design teams across multiple concurrent programs.",
      "Standardized research and design-sprint practices across delivery teams.",
    ],
  },
  {
    period: "Dec 2019 – Nov 2020",
    role: "UX/UI Lead / Project Manager",
    org: "American Technology Company (IBM)",
    context: "AI Platform Teams · Wealth",
    points: [
      "Led UX for enterprise AI platform products using Enterprise Design Thinking.",
      "Drove the UITF investment platform that generated ₱2.1B in new AUM within six months.",
      "Partnered with product and engineering to ship complex B2B experiences.",
      "Facilitated design workshops and playbacks with enterprise stakeholders.",
    ],
    caseStudies: [
      { slug: "uitf-investment", label: "Mobile-First UITF Investment Platform" },
    ],
  },
  {
    period: "Earlier",
    role: "UX / Product Design Roles",
    org: "Technology & Consulting",
    points: [
      "Progressive UX and product design roles building foundational research, IA, and interaction-design expertise.",
    ],
  },
];
