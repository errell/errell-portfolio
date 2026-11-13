export interface Metric {
  /** The headline value, e.g. "58%", "₱2.1B", "5.8 min", "4.7/5.0" */
  value: string;
  /** Short label under the value */
  label: string;
  /** Optional baseline / comparison context, e.g. "vs. 90 min branch" */
  baseline?: string;
  /** Optional directional prefix rendered before the value */
  direction?: "up" | "down";
  /** Optional numeric target for count-up animation. If omitted, value renders as-is. */
  countTo?: number;
  /** Optional prefix/suffix wrapping a counted number, e.g. prefix "₱", suffix "B" */
  prefix?: string;
  suffix?: string;
  /** Decimal places to show while counting */
  decimals?: number;
  /** Optional icon key (see MetricCard iconMap) */
  icon?: string;
  /** Optional plain-language explanation for jargon in the label */
  tooltip?: string;
}

export interface FlowState {
  title: string;
  points: string[];
}

export interface OverviewSection {
  problem: string;
  currentState: FlowState;
  targetState: FlowState;
  objectives: string[];
}

export interface ResearchMethod {
  method: string;
  detail: string;
  sample: string;
}

export interface Finding {
  title: string;
  detail: string;
}

export interface Persona {
  name: string;
  role: string;
  location: string;
  quote: string;
  goals: string[];
  frustrations: string[];
}

export interface ResearchSection {
  intro: string;
  methods: ResearchMethod[];
  findings: Finding[];
  personas: Persona[];
}

export interface JourneyStage {
  stage: string;
  action: string;
  emotion: "positive" | "neutral" | "negative";
  thought: string;
}

export interface DefineSection {
  hmw: string[];
  journey: JourneyStage[];
  affinity: string[];
}

export interface Iteration {
  round: string;
  focus: string;
  outcome: string;
}

export interface DesignDecision {
  title: string;
  detail: string;
}

/** Coded phone-prototype screens available for a signature interaction. */
export type SignatureScreen = "camera-coach" | "confirm-payment" | "goal-first";

export interface WireframeSpec {
  title: string;
  caption: string;
  /** Simple structured rows for the wireframe block renderer */
  rows: string[];
  /** When set, render this coded phone prototype instead of the ASCII rows */
  screen?: SignatureScreen;
}

export interface DesignSection {
  decisions: DesignDecision[];
  wireframe: WireframeSpec;
  iterations: Iteration[];
}

export interface OutcomesSection {
  intro: string;
  metrics: Metric[];
}

export interface PrototypeScreen {
  id: string;
  src: string;
  title: string;
  caption: string;
  decision: string;
}

export interface CaseStudy {
  slug: string;
  number: string; // "01", "02", "03"
  title: string;
  subtitle: string;
  industry: string;
  timeline: string;
  team: string;
  tags: string[];
  heroMetrics: Metric[]; // 4 top-line outcomes
  previewMetrics: Metric[]; // top 2 for card previews
  sections: {
    overview: OverviewSection;
    research: ResearchSection;
    define: DefineSection;
    design: DesignSection;
    outcomes: OutcomesSection;
  };
  keyLearnings: string[];
  prototypes: PrototypeScreen[];
}

/* ------------------------------------------------------------------ */
/* Showcase case study: a lighter, feature-led format for concept work */
/* (no research/outcome metrics), e.g. Bench CV Exporter.              */
/* ------------------------------------------------------------------ */

export interface ShowcaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ShowcaseCallout {
  title: string;
  detail: string;
}

export interface ShowcasePoint {
  title: string;
  detail: string;
}

export interface ShowcaseFeature {
  id: string;
  title: string;
  /** One-line summary used in the overview grid */
  summary: string;
  /** Longer subtitle shown above the screen */
  lead: string;
  screens: ShowcaseImage[];
  callouts: ShowcaseCallout[];
}

export interface ShowcaseVideo {
  src: string;
  poster: string;
  type: string;
  width: number;
  height: number;
  /** Duration label, e.g. "9:23" */
  duration: string;
  title: string;
  description: string;
  /** Optional WebVTT captions track */
  captions?: { src: string; srcLang: string; label: string };
}

export interface ShowcaseMilestone {
  dates: string;
  title: string;
  detail: string;
}

export interface ShowcaseCaseStudy
  extends Pick<
    CaseStudy,
    | "slug"
    | "number"
    | "title"
    | "subtitle"
    | "industry"
    | "timeline"
    | "team"
    | "tags"
    | "heroMetrics"
    | "previewMetrics"
  > {
  kind: "showcase";
  tagline: string;
  disclaimer: string;
  video: ShowcaseVideo;
  challenge: ShowcasePoint[];
  opportunity: { headline: string; detail: string };
  solution: ShowcasePoint[];
  features: ShowcaseFeature[];
  delivery: {
    intro: string;
    process: string[];
    milestones: ShowcaseMilestone[];
    next: string;
  };
}
