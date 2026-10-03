import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

const variants = {
  default: "bg-accent/10 text-accent",
  accent: "bg-accent/10 text-accent",
  outline: "bg-transparent text-muted border border-border",
};

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-5",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
