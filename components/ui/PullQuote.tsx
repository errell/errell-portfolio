import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  children: ReactNode;
  cite?: string;
  className?: string;
}

export function PullQuote({ children, cite, className }: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        "relative rounded-2xl border border-border bg-surface/60 p-6 md:p-8",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-4 left-6 font-sora text-6xl leading-none text-accent/40"
      >
        &ldquo;
      </span>
      <p className="font-sora text-lg font-medium leading-relaxed text-primary md:text-xl">
        {children}
      </p>
      {cite && (
        <footer className="mt-4 text-sm text-primary/50">— {cite}</footer>
      )}
    </blockquote>
  );
}
