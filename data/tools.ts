export interface ToolCategory {
  title: string;
  items: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    title: "Design & Prototyping",
    items: ["Figma", "Sketch", "Adobe XD", "InVision", "Zeplin", "Miro", "FigJam"],
  },
  {
    title: "Project & Agile",
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
    title: "AI & Vibe Coding",
    items: ["Claude (Anthropic)", "ChatGPT (OpenAI)", "Copilot", "GitHub"],
  },
  {
    title: "Methodologies",
    items: [
      "Agile/Scrum",
      "Design Sprints",
      "Enterprise Design Thinking",
      "Lean UX",
      "Service Design",
    ],
  },
];
