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
    period: "2021 – Present",
    role: "UX Design Manager / Squad UX Lead",
    org: "Major Philippine Universal Bank (via Accenture)",
    context: "Digital Banking · Payments",
    points: [
      "Lead UX across 5+ Agile squads shipping digital onboarding and payments products.",
      "Owned the eKYC account-opening redesign that cut abandonment by 58% and shifted volume out of branches.",
      "Directed the unified payments hub that reduced errors 71% and support costs by ₱12.2M/month.",
    ],
  },
  {
    period: "2018 – 2021",
    role: "UX Design Manager",
    org: "Global Professional Services Firm (EY)",
    context: "Enterprise Consulting",
    points: [
      "Led enterprise UX engagements for banking and financial-services clients.",
      "Built and mentored cross-functional design teams across multiple concurrent programs.",
      "Standardized research and design-sprint practices across delivery teams.",
    ],
  },
  {
    period: "2015 – 2018",
    role: "UX/UI Lead",
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
