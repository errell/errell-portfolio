export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "UX & Design Leadership",
    items: [
      "User-Centered Design (UCD)",
      "UX Research & Testing",
      "Heuristic Evaluation",
      "Wireframing & Prototyping",
      "Design Sprints",
      "Enterprise Design Thinking",
    ],
  },
  {
    title: "Service & Product Design",
    items: [
      "Service Blueprints",
      "Customer Journey Mapping",
      "Use Case Analysis",
      "Product Roadmapping & Vision",
      "Design System Strategy",
      "Reusable Component Libraries",
      "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    title: "Product & Project Management",
    items: [
      "Agile & Scrum Methodologies",
      "Product Ownership & Backlog Management",
      "Stakeholder Management",
      "Cross-Functional Team Leadership",
      "MVP Definition",
      "Scope & Business Development",
    ],
  },
  {
    title: "Industry Domains",
    items: [
      "Banking & Financial Services",
      "Fintech & Digital Banking",
      "Wealth Management (UITF/Investments)",
      "Payments & Transfers",
      "Cloud Computing & AI",
      "Enterprise SaaS Platforms",
    ],
  },
];

// Clients / experience bar — shown for context only.
export const clients: string[] = [
  "Accenture",
  "IBM",
  "EY",
  "AXA",
  "Sun Life Financial",
];
