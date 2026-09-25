export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "UX & Design Leadership",
    items: [
      "Design Management",
      "Team Mentorship",
      "Design Systems",
      "UX Strategy",
      "Stakeholder Alignment",
      "Design Ops",
      "Cross-functional Facilitation",
    ],
  },
  {
    title: "Product & Project Mgmt",
    items: [
      "Agile / Scrum",
      "Squad Leadership",
      "Roadmapping",
      "Design Sprints",
      "Lean UX",
      "Jira / Confluence",
      "Backlog Prioritization",
    ],
  },
  {
    title: "Industry Experience",
    items: [
      "Retail & Digital Banking",
      "Fintech",
      "Wealth & Investments",
      "Payments (InstaPay, PESONet, QR Ph)",
      "eKYC / BSP Compliance",
      "Enterprise Consulting",
    ],
  },
  {
    title: "Service & Product Design",
    items: [
      "User Research",
      "Journey Mapping",
      "Service Blueprinting",
      "Usability Testing",
      "Accessibility (WCAG 2.1 AA)",
      "Prototyping",
      "Content & UX Writing",
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
