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
          className="dt-card p-6"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
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
