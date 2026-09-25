import { toolCategories } from "@/data/tools";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function ToolsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {toolCategories.map((cat, i) => (
        <Reveal
          key={cat.title}
          delay={i * 0.06}
          className="rounded-2xl border border-border bg-surface/40 p-6"
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
            {cat.title}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cat.items.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
