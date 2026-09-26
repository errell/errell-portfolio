import type { CaseStudy } from "@/types/case-study";

export const uitfInvestment: CaseStudy = {
  slug: "uitf-investment",
  number: "02",
  title: "Mobile-First UITF Investment Platform",
  subtitle:
    "Turning first-time savers into first-time investors by reframing a compliance form as a guided conversation — and 'UITF' as a goal you can picture.",
  industry: "Wealth & Investments",
  timeline: "20 Weeks · 5 Sprints",
  team: "1 UX Lead, 2 UX Designers, 1 Researcher, 1 Financial Content Specialist",
  tags: ["Banking", "Wealth", "Fintech"],
  heroMetrics: [
    {
      value: "+142%",
      label: "New UITF investors",
      baseline: "vs. prior year",
      direction: "up",
      countTo: 142,
      prefix: "+",
      suffix: "%",
      icon: "trend-up",
    },
    {
      value: "₱2.1B",
      label: "New AUM",
      baseline: "within 6 months",
      countTo: 2.1,
      prefix: "₱",
      suffix: "B",
      decimals: 1,
      icon: "peso",
    },
    {
      value: "91%",
      label: "Task success rate",
      countTo: 91,
      suffix: "%",
      icon: "check",
    },
    {
      value: "44%",
      label: "Fewer support tickets",
      baseline: "UITF-related",
      direction: "down",
      countTo: 44,
      suffix: "%",
      icon: "trend-down",
    },
  ],
  previewMetrics: [
    {
      value: "₱2.1B",
      label: "New AUM in 6 months",
    },
    {
      value: "+142%",
      label: "New UITF investors",
      direction: "up",
    },
  ],
  sections: {
    overview: {
      problem:
        "Only 3% of savings account holders had ever invested in a UITF. Assets under management grew a flat 4% YoY while the market grew 18%. The money and the appetite existed — the digital interface was the barrier standing between savers and their goals.",
      currentState: {
        title: "Current State",
        points: [
          "14 funds listed with jargon-heavy names",
          "12-question compliance form up front",
          "Abstract percentage-based projections",
          "'UITF' as the entry point — meaningless to savers",
          "Freeze at the first sign of risk language",
        ],
      },
      targetState: {
        title: "Target State",
        points: [
          "Start from a goal, not a product",
          "5-question illustrated suitability conversation",
          "Peso-denominated, concrete projections",
          "1–3 curated funds matched to the goal",
          "'You can withdraw anytime' always in view",
        ],
      },
      objectives: [
        "Build a mobile-first investment platform that uses progressive disclosure to defeat overwhelm.",
        "Reimagine the BSP Client Suitability Assessment as a guided conversation, not a form.",
        "Convert the bank's large base of savers into first-time investors.",
        "Grow UITF AUM in line with market growth while meeting WCAG 2.1 AA.",
      ],
    },
    research: {
      intro:
        "We studied how ordinary Filipinos actually think about money over time — not how banks assume they do — using longitudinal and simulation methods.",
      methods: [
        {
          method: "Financial Diaries",
          detail: "4-week money journaling via WhatsApp",
          sample: "n=18",
        },
        {
          method: "Investment Simulations",
          detail: "Think-aloud runs through mock investing tasks",
          sample: "n=24",
        },
        {
          method: "Mental Model Interviews",
          detail: "How people conceptualize saving vs. investing",
          sample: "n=20",
        },
        {
          method: "Competitor Benchmark",
          detail: "Six local & regional investing platforms",
          sample: "6 platforms",
        },
        {
          method: "Concept Testing",
          detail: "Validation with practicing financial advisors",
          sample: "n=8",
        },
      ],
      findings: [
        {
          title: "Analysis paralysis was the #1 failure mode",
          detail:
            "Faced with 14 funds and dense comparisons, users simply stopped — more choice produced fewer decisions, not better ones.",
        },
        {
          title: "The word 'UITF' was itself a barrier",
          detail:
            "The acronym signaled 'not for people like me.' Users couldn't map it to anything they wanted or understood.",
        },
        {
          title: "Loss aversion was extreme",
          detail:
            "Any mention of possible loss triggered an immediate freeze; the fear of losing dwarfed the appeal of gains.",
        },
        {
          title: "Their mental model was 'savings that earns more'",
          detail:
            "Users understood investing as 'savings that earns more if you don't touch it' — a frame the product never spoke to.",
        },
        {
          title: "The BSP CSA read as a tedious form",
          detail:
            "Every competitor treated the mandatory suitability assessment as a compliance hurdle, killing momentum right at the start.",
        },
      ],
      personas: [
        {
          name: "Pia",
          role: "BPO Team Lead",
          location: "Quezon City",
          quote:
            "I have ₱80K just sitting in savings. I know it should be doing more — I just don't know where to start without feeling dumb.",
          goals: [
            "Grow money for a house down payment",
            "Start investing without needing a finance degree",
            "Be able to pull money out if an emergency hits",
          ],
          frustrations: [
            "Too many funds, no idea how to choose",
            "Jargon makes her feel unqualified",
            "Terrified of losing her hard-earned savings",
          ],
        },
      ],
    },
    define: {
      hmw: [
        "How might we start from what someone is saving for instead of which fund they should pick?",
        "How might we turn the mandatory suitability assessment into momentum rather than a wall?",
        "How might we make possible outcomes concrete and reassuring instead of abstract and scary?",
        "How might we shrink choice to the few options that actually fit a person's goal?",
      ],
      journey: [
        {
          stage: "Motivation",
          action: "Wants to grow idle savings",
          emotion: "positive",
          thought: "My money should be doing more.",
        },
        {
          stage: "Entry",
          action: "Sees 'UITF' and 14 funds",
          emotion: "negative",
          thought: "This isn't for someone like me.",
        },
        {
          stage: "Suitability",
          action: "Hits a 12-question form",
          emotion: "negative",
          thought: "Ugh, a test. Maybe later.",
        },
        {
          stage: "Goal-first (new)",
          action: "Picks 'house down payment'",
          emotion: "positive",
          thought: "Oh — it's about my goal.",
        },
        {
          stage: "Invest",
          action: "Funds a matched fund",
          emotion: "positive",
          thought: "That felt safe and simple.",
        },
      ],
      affinity: [
        "Goals are the language; funds are the implementation detail.",
        "Compliance can be an experience, not a toll gate.",
        "Concreteness (pesos, timelines) defuses loss aversion.",
        "Liquidity reassurance unlocks the first commitment.",
      ],
    },
    design: {
      decisions: [
        {
          title: "Goal-first navigation",
          detail:
            "The platform opens with 'What are you saving for?' — house, emergency fund, travel, retirement — so investing starts from intent, not product.",
        },
        {
          title: "CSA as a 5-question conversation",
          detail:
            "The 12-question BSP suitability form became a 5-question illustrated conversation that feels like guidance, keeping momentum intact.",
        },
        {
          title: "Curated choice (1–3 funds)",
          detail:
            "Instead of 14 funds, the system presents the 1–3 that fit the user's goal and risk profile — decision, not research project.",
        },
        {
          title: "Peso-denominated projections",
          detail:
            "Outcomes shown as concrete pesos — '₱6,200 from ₱5,000' — instead of abstract percentages users couldn't feel.",
        },
        {
          title: "Persistent liquidity reassurance",
          detail:
            "'You can withdraw anytime' stays visible throughout, directly answering the loss-aversion fear that froze users.",
        },
      ],
      wireframe: {
        title: "Goal-First Entry",
        caption:
          "The first screen asks about the person's life, not the bank's product catalog.",
        rows: [
          "  Ano ang pinapon mo? / What are you saving for?",
          "┌───────────────┐  ┌───────────────┐",
          "│  🏠  House     │  │  🛟  Emergency │",
          "│  down payment │  │  fund         │",
          "└───────────────┘  └───────────────┘",
          "┌───────────────┐  ┌───────────────┐",
          "│  ✈️  Travel    │  │  🌴  Retirement│",
          "└───────────────┘  └───────────────┘",
          "  ────────────────────────────────",
          "  ✓ You can withdraw anytime",
          "[  Ipagpatuloy / Continue  ]",
        ],
      },
      iterations: [
        {
          round: "Round 1",
          focus: "Fund-list redesign",
          outcome: "Cleaner, but users still froze at choice",
        },
        {
          round: "Round 2",
          focus: "Goal-first entry point",
          outcome: "Task starts climbed — intent framing clicked",
        },
        {
          round: "Round 3",
          focus: "CSA as guided conversation",
          outcome: "Suitability drop-off nearly eliminated",
        },
        {
          round: "Round 4",
          focus: "Peso projections + liquidity copy",
          outcome: "Loss-aversion hesitation fell; conversions rose",
        },
        {
          round: "Round 5",
          focus: "Accessibility & polish",
          outcome: "WCAG 2.1 AA verified; 91% task success",
        },
      ],
    },
    outcomes: {
      intro:
        "Reframing product as goal and form as conversation turned a stagnant line of business into the bank's fastest-growing one.",
      metrics: [
        {
          value: "+142%",
          label: "New UITF investors",
          baseline: "vs. prior year",
          direction: "up",
          countTo: 142,
          prefix: "+",
          suffix: "%",
          icon: "trend-up",
        },
        {
          value: "91%",
          label: "Task success rate",
          countTo: 91,
          suffix: "%",
          icon: "check",
        },
        {
          value: "44%",
          label: "Fewer UITF support tickets",
          direction: "down",
          countTo: 44,
          suffix: "%",
          icon: "trend-down",
        },
        {
          value: "₱2.1B",
          label: "New AUM",
          baseline: "within 6 months",
          countTo: 2.1,
          prefix: "₱",
          suffix: "B",
          decimals: 1,
          icon: "peso",
        },
        {
          value: "AA",
          label: "WCAG 2.1 compliance",
          icon: "accessibility",
        },
      ],
    },
  },
  prototypes: [
    {
      id: "uitf-01",
      src: "/images/case-studies/uitf-investment/01-goal-first-entry.jpg",
      title: "Goal-First Entry",
      caption:
        "“What are you saving for?” — Bahay, Emergency Fund, Travel, Retirement. Removes the word “UITF” as the first barrier.",
      decision: "Goal-first navigation",
    },
    {
      id: "uitf-02",
      src: "/images/case-studies/uitf-investment/02-guided-csa-conversation.jpg",
      title: "Guided CSA Conversation",
      caption:
        "12-question BSP CSA form rewritten as a 5-step illustrated chat with Taglish reply chips.",
      decision: "CSA as guided conversation",
    },
    {
      id: "uitf-03",
      src: "/images/case-studies/uitf-investment/03-peso-projection-funds.jpg",
      title: "Peso Projection + Curated Funds",
      caption:
        "“If you invest ₱5,000 today… ≈ ₱6,200 in 3 years.” Only 1–3 funds shown, plus “withdraw anytime.”",
      decision: "Curated choice + peso projections",
    },
    {
      id: "uitf-04",
      src: "/images/case-studies/uitf-investment/04-empty-state-first-time.jpg",
      title: "First-Time / Empty State",
      caption:
        "Encouraging empty state for the 97% of savers who have never invested.",
      decision: "Progressive disclosure onboarding",
    },
    {
      id: "uitf-05",
      src: "/images/case-studies/uitf-investment/05-risk-warning-heads-up.jpg",
      title: "Soft Risk Heads-Up",
      caption:
        "Loss-aversion handled with a calm warning and a safer-options path — no fear language.",
      decision: "Loss-aversion handling",
    },
  ],

  keyLearnings: [
    "People invest in goals, not products. Leading with 'what are you saving for?' unlocked an audience the fund list had turned away.",
    "Compliance is an experience you design, not a form you inherit. The suitability conversation drove momentum instead of killing it.",
    "Concreteness beats accuracy for motivation. Peso projections moved people that mathematically-correct percentages never could.",
    "Reassurance is conversion. Making liquidity impossible to miss defused the single biggest reason savers stayed on the sidelines.",
  ],
};
