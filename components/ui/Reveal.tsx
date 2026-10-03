"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Scroll-triggered reveal using IntersectionObserver + CSS transitions.
 *
 * Rendered identically on the server and the client's first paint (no hidden
 * initial state), so there are no hydration mismatches — even when the user has
 * prefers-reduced-motion enabled. Content is always in the DOM and visible
 * without JS. The entrance animation is a progressive enhancement applied only
 * after mount, and only to elements that start below the fold (so above-the-fold
 * content never flashes). The global reduced-motion CSS rule collapses the
 * transition to instant for users who prefer less motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If it's already in view at mount, show it immediately with no animation.
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.9;
    if (alreadyInView) {
      setShown(true);
      setEnhanced(true);
      return;
    }

    setEnhanced(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error - polymorphic ref across allowed tags
      ref={ref}
      className={cn(
        enhanced && "transition-all duration-700 ease-out will-change-transform",
        enhanced && !shown && "translate-y-6 opacity-0",
        className,
      )}
      style={enhanced ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
