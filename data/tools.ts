export interface ToolCategory {
  title: string;
  items: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "Design",
    items: ["Figma", "Sketch", "Adobe XD", "InVision", "Zeplin", "Miro", "FigJam"],
  },
  {
    title: "Project Management",
    items: ["Jira", "Confluence", "Trello", "Azure DevOps"],
  },
  {
    title: "Research & Testing",
    items: [
      "UserTesting",
      "Hotjar",
      "Attention Insight",
      "Clarity UX",
      "Optimal Workshop",
      "Maze",
    ],
  },
  {
    title: "Methodologies",
    items: [
      "Agile / Scrum",
      "Design Sprints",
      "Enterprise Design Thinking",
      "Lean UX",
      "Service Design",
    ],
  },
  {
    title: "AI Tools",
    items: ["Claude", "ChatGPT", "Copilot (rapid prototyping)"],
  },
];
