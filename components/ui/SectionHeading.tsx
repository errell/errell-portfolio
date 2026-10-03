import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Mono index such as "01". */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-primary/70">{index}</span>}
          {index && (
            <span aria-hidden className="text-primary/30">
              /
            </span>
          )}
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
