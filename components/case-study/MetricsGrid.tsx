import type { Metric } from "@/types/case-study";
import { MetricCard } from "./MetricCard";
import { Reveal } from "@/components/ui/Reveal";

interface MetricsGridProps {
  metrics: Metric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <Reveal key={m.label} delay={(i % 4) * 0.08} className="h-full">
          <MetricCard metric={m} />
        </Reveal>
      ))}
    </div>
  );
}
