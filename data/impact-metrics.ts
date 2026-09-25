import type { Metric } from "@/types/case-study";

// Homepage "Impact Numbers" bar — scroll-triggered count-up.
export const impactMetrics: Metric[] = [
  {
    value: "5+",
    label: "Agile Squads Led",
    countTo: 5,
    suffix: "+",
  },
  {
    value: "₱2.1B",
    label: "New AUM Generated",
    countTo: 2.1,
    prefix: "₱",
    suffix: "B",
    decimals: 1,
  },
  {
    value: "71%",
    label: "Error Rate Reduction",
    countTo: 71,
    suffix: "%",
    direction: "down",
  },
  {
    value: "10+",
    label: "Years Enterprise UX",
    countTo: 10,
    suffix: "+",
  },
  {
    value: "3",
    label: "PH Bank Products Shipped",
    countTo: 3,
  },
];
