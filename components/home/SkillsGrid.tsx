"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { skillCategories } from "@/data/skills";
import { useT } from "@/lib/i18n";

export function SkillsGrid() {
  const { t } = useT();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {skillCategories.map((cat, i) => (
        <Reveal
          key={cat.title}
          delay={i * 0.04}
          className="dt-card p-6"
        >
          <h3 className="text-sm font-semibold tracking-[-0.01em] text-primary">
            {t.home.skillTitles[i] ?? cat.title}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
