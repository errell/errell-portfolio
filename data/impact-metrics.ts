import type { Metric } from "@/types/case-study";

// Homepage "Impact Numbers" bar — scroll-triggered count-up.
export const impactMetrics: Metric[] = [
  {
    value: "5+",
    label: "Agile Squads Led",
    tooltip: "Cross-functional Agile teams led as UX Design Manager across banking products.",
    countTo: 5,
    suffix: "+",
  },
  {
    value: "₱2.1B",
    label: "New AUM Generated",
    tooltip: "Assets Under Management — total customer money invested through the product.",
    countTo: 2.1,
    prefix: "₱",
    suffix: "B",
    decimals: 1,
  },
  {
    value: "71%",
    label: "Error Rate Reduction",
    tooltip: "Drop in payment/input errors after redesigning the payments experience.",
    countTo: 71,
    suffix: "%",
    direction: "down",
  },
  {
    value: "15+",
    label: "Years Enterprise UX",
    tooltip: "Years designing and shipping enterprise digital products, mainly banking & fintech.",
    countTo: 15,
    suffix: "+",
  },
  {
    value: "6",
    label: "PH Bank Products Shipped",
    tooltip: "Major Philippine bank digital products taken from research through production.",
    countTo: 6,
  },
];
