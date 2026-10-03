"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { skillCategories } from "@/data/skills";
import { useT } from "@/lib/i18n";

export function SkillsGrid() {
  const { t } = useT();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {skillCategories.map((cat, i) => (
        <Reveal
          key={cat.title}
          delay={i * 0.08}
          className="rounded-2xl border border-border bg-surface/40 p-6"
        >
          <h3 className="font-sora text-base font-semibold text-primary">
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
