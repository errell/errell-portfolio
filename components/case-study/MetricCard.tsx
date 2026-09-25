import type { Metric } from "@/types/case-study";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { cn } from "@/lib/utils";

// Minimal inline SVG icons keyed by Metric.icon. Kept dependency-free.
const iconMap: Record<string, React.ReactNode> = {
  "trend-up": (
    <path d="M3 17l6-6 4 4 8-8M21 7h-5m5 0v5" />
  ),
  "trend-down": (
    <path d="M3 7l6 6 4-4 8 8M21 17h-5m5 0v-5" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  star: (
    <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21.9l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  peso: (
    <>
      <path d="M7 20V5h5.5a4 4 0 010 8H7" />
      <path d="M4 9h11M4 13h11" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M13 10h5M13 14h5" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M4 8h16M12 8v6m0 0l-3.5 6M12 14l3.5 6" />
    </>
  ),
};

function Icon({ name }: { name?: string }) {
  const glyph = name ? iconMap[name] : undefined;
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {glyph}
    </svg>
  );
}

interface MetricCardProps {
  metric: Metric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const {
    value,
    label,
    baseline,
    direction,
    countTo,
    prefix,
    suffix,
    decimals,
    icon,
  } = metric;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-accent/40",
        className,
      )}
    >
      <div className="flex items-center justify-between text-accent">
        <Icon name={icon} />
        {direction && (
          <span
            className={cn(
              "font-mono text-sm",
              direction === "down" ? "text-green-400" : "text-amber",
            )}
            aria-hidden
          >
            {direction === "down" ? "↓" : "↑"}
          </span>
        )}
      </div>

      <div className="mt-4 font-mono text-3xl font-bold text-amber md:text-4xl">
        {typeof countTo === "number" ? (
          <AnimatedNumber
            value={countTo}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals ?? 0}
          />
        ) : (
          <span>{value}</span>
        )}
      </div>

      <p className="mt-2 text-sm font-medium leading-snug text-primary">
        {label}
      </p>
      {baseline && (
        <p className="mt-1 text-xs text-primary/45">{baseline}</p>
      )}
    </div>
  );
}
