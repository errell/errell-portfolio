import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface SectionDividerProps {
  number: string; // "01"
  title: string;
  description?: ReactNode;
}

export function SectionDivider({
  number,
  title,
  description,
}: SectionDividerProps) {
  return (
    <Reveal className="border-t border-border pt-10">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm font-medium text-accent">
          {number}
        </span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-4 font-sora text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-primary/60">
          {description}
        </p>
      )}
    </Reveal>
  );
}
