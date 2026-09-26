import type { CaseStudy } from "@/types/case-study";

export const paymentsHub: CaseStudy = {
  slug: "payments-hub",
  number: "03",
  title: "Unified Payments & Transfer Hub",
  subtitle:
    "Collapsing seven tangled payment paths into one confident flow — built around 'who am I paying?' instead of 'which rail?' — ahead of the QR Ph v2.0 launch.",
  industry: "Payments",
  timeline: "14 Weeks · 3.5 Sprints",
  team: "1 UX Lead, 3 UX Designers, 1 Content Designer, 1 Accessibility Specialist",
  tags: ["Payments", "Banking", "Fintech"],
  heroMetrics: [
    {
      value: "71%",
      label: "Payment error rate",
      baseline: "19% → 5.5%",
      direction: "down",
      countTo: 71,
      suffix: "%",
      icon: "trend-down",
    },
    {
      value: "68%",
      label: "Fewer support calls",
      baseline: "45K → 14.4K/mo",
      direction: "down",
      countTo: 68,
      suffix: "%",
      icon: "trend-down",
    },
    {
      value: "₱12.2M",
      label: "Monthly savings",
      baseline: "support cost",
      countTo: 12.2,
      prefix: "₱",
      suffix: "M",
      decimals: 1,
      icon: "peso",
    },
    {
      value: "3×",
      label: "QR Ph adoption",
      baseline: "8% → 24%",
      direction: "up",
      countTo: 3,
      suffix: "×",
      icon: "trend-up",
    },
  ],
  previewMetrics: [
    {
      value: "71%",
      label: "Error rate reduction",
      direction: "down",
    },
    {
      value: "₱12.2M",
      label: "Monthly support savings",
    },
  ],
  sections: {
    overview: {
      problem:
        "After eight years of organic growth, payments lived across 7 separate navigation paths. The result: a 19% error rate, 45,000 support calls a month costing ₱18M a year — and a QR Ph v2.0 launch bearing down on an experience already buckling.",
      currentState: {
        title: "Current State",
        points: [
          "7 different navigation paths to move money",
          "Users forced to pick the rail (InstaPay vs. PESONet)",
          "19% error rate; wrong number, decimal, or bank",
          "No in-app status → anxiety → hotline calls",
          "QR Ph buried; 41% aware but only 8% using it",
        ],
      },
      targetState: {
        title: "Target State",
        points: [
          "One entry point for every kind of payment",
          "System silently picks the right rail",
          "Full-page confirm with the amount in words",
          "Real-time transaction status, in-app",
          "QR Ph scan elevated to the home screen",
        ],
      },
      objectives: [
        "Consolidate InstaPay, PESONet, QR Ph, and bills payment into a single unified experience.",
        "Drive down the payment error rate and the support calls those errors generate.",
        "Prepare the experience for the imminent QR Ph v2.0 launch and grow its adoption.",
        "Meet WCAG 2.1 AA and perform on low-end Android over slow connections.",
      ],
    },
    research: {
      intro:
        "We mined 45,000 real support-call transcripts and paired them with structured IA research to find where and why payments went wrong.",
      methods: [
        {
          method: "Card Sorting",
          detail: "How users group payment concepts",
          sample: "n=28",
        },
        {
          method: "Error Log Analysis",
          detail: "45,000 support-call transcripts coded",
          sample: "45K calls",
        },
        {
          method: "Contextual Observation",
          detail: "Watching real payments in the wild",
          sample: "n=18",
        },
        {
          method: "Competitor Benchmark",
          detail: "GCash, Maya, BDO, BPI, Metrobank",
          sample: "5 apps",
        },
        {
          method: "Tree Testing",
          detail: "Findability of the new IA",
          sample: "n=52",
        },
      ],
      findings: [
        {
          title: "Filipinos think 'who,' not 'which rail'",
          detail:
            "Users reason about 'who am I paying?' — the InstaPay vs. PESONet choice was a mental-model mismatch the app forced on them.",
        },
        {
          title: "Three errors dominated",
          detail:
            "Wrong account number (32%), wrong decimal placement (28%), and wrong bank selected (21%) accounted for the vast majority of failures.",
        },
        {
          title: "Errors spiked on mobile data",
          detail:
            "68% of errors occurred on mobile data, where lag and timeouts pushed users into double-submits and mistakes.",
        },
        {
          title: "Status anxiety drove the hotline",
          detail:
            "With no in-app confirmation, users called the hotline just to ask 'did it go through?' — a huge share of the 45K monthly calls.",
        },
        {
          title: "QR Ph was known but unused",
          detail:
            "Awareness sat at 41% but usage at only 8% — the feature was buried too deep to become a habit.",
        },
      ],
      personas: [
        {
          name: "Aling Rosa",
          role: "Sari-sari store owner",
          location: "Caloocan",
          quote:
            "Basta ba sigurado akong napasa yung pera. Tumatawag ako sa hotline kasi natatakot ako baка hindi umabot.",
          goals: [
            "Pay suppliers and receive customer payments quickly",
            "Be certain a transfer actually went through",
          ],
          frustrations: [
            "Doesn't know or care which 'rail' to pick",
            "Calls the hotline out of status anxiety",
          ],
        },
        {
          name: "J-jay",
          role: "Freelancer",
          location: "Davao",
          quote:
            "I send money to different banks all the time. Picking the wrong option and paying twice is my nightmare.",
          goals: [
            "Send to any bank without second-guessing",
            "Avoid costly wrong-number or wrong-bank mistakes",
          ],
          frustrations: [
            "Too many payment entry points",
            "Errors happen most when his signal is weak",
          ],
        },
      ],
    },
    define: {
      hmw: [
        "How might we organize payments around the person being paid instead of the network used?",
        "How might we make the three dominant errors nearly impossible to commit?",
        "How might we give users certainty a payment went through — without a phone call?",
        "How might we make QR Ph the obvious, default way to pay?",
      ],
      journey: [
        {
          stage: "Intent",
          action: "Needs to pay someone",
          emotion: "neutral",
          thought: "Which of these seven do I use?",
        },
        {
          stage: "Rail choice",
          action: "Guesses InstaPay vs. PESONet",
          emotion: "negative",
          thought: "I have no idea what the difference is.",
        },
        {
          stage: "Entry",
          action: "Types account + amount",
          emotion: "negative",
          thought: "Did I put the decimal in the right place?",
        },
        {
          stage: "Confirm (new)",
          action: "Reviews amount in words",
          emotion: "positive",
          thought: "Yes — that's exactly right.",
        },
        {
          stage: "Status",
          action: "Sees real-time confirmation",
          emotion: "positive",
          thought: "It went through. No need to call.",
        },
      ],
      affinity: [
        "The rail is the bank's problem, not the user's decision.",
        "Confirmation design is error prevention.",
        "Certainty in-app removes the reason to call.",
        "A feature only counts if it's where the habit forms.",
      ],
    },
    design: {
      decisions: [
        {
          title: "Single entry point",
          detail:
            "One 'Send Money' flow replaces all 7 touchpoints — users start from who they're paying, never from a network.",
        },
        {
          title: "Invisible smart rail selection",
          detail:
            "The system decides InstaPay vs. PESONet based on amount and timing, removing a choice users never understood.",
        },
        {
          title: "Full-page Confirm with amount in words",
          detail:
            "A dedicated confirmation screen spells the amount in words, directly targeting the decimal and wrong-number errors.",
        },
        {
          title: "Real-time in-app status",
          detail:
            "Live transaction status replaces the uncertainty that sent tens of thousands of users to the hotline.",
        },
        {
          title: "QR Ph elevated to home",
          detail:
            "The QR Ph scan button moved to the home screen, converting latent awareness into everyday habit.",
        },
      ],
      wireframe: {
        title: "Full-Page Confirm",
        caption:
          "Spelling the amount in words is the single most effective guard against decimal and wrong-number errors.",
        rows: [
          "‹ Edit                         Confirm payment",
          "  You are sending to",
          "  ┌─────────────────────────────┐",
          "  │  Maria S. Santos             │",
          "  │  •••• 4821 · BDO             │",
          "  └─────────────────────────────┘",
          "  Amount",
          "  ₱ 1,500.00",
          "  “One thousand five hundred pesos”",
          "  Rail: chosen for you · arrives instantly",
          "[  Hold to confirm  ●━━━━━━  ]",
        ],
      },
      iterations: [
        {
          round: "Round 1",
          focus: "Unified IA from card sort",
          outcome: "Findability up sharply in tree testing",
        },
        {
          round: "Round 2",
          focus: "Smart rail + confirm screen",
          outcome: "Simulated error rate dropped dramatically",
        },
        {
          round: "Round 3",
          focus: "Status, QR Ph, accessibility & senior mode",
          outcome: "WCAG AA verified; QR Ph usage climbed",
        },
      ],
    },
    outcomes: {
      intro:
        "One confident flow replaced seven anxious ones — cutting errors, emptying the hotline queue, and turning QR Ph into a habit right as v2.0 launched.",
      metrics: [
        {
          value: "71%",
          label: "Lower payment error rate",
          baseline: "19% → 5.5%",
          direction: "down",
          countTo: 71,
          suffix: "%",
          icon: "trend-down",
        },
        {
          value: "68%",
          label: "Fewer support calls",
          baseline: "45K → 14.4K/mo",
          direction: "down",
          countTo: 68,
          suffix: "%",
          icon: "phone",
        },
        {
          value: "₱12.2M",
          label: "Monthly support savings",
          countTo: 12.2,
          prefix: "₱",
          suffix: "M",
          decimals: 1,
          icon: "peso",
        },
        {
          value: "3×",
          label: "QR Ph adoption",
          baseline: "8% → 24%",
          direction: "up",
          countTo: 3,
          suffix: "×",
          icon: "trend-up",
        },
        {
          value: "84%",
          label: "Faster to payment screen",
          direction: "down",
          countTo: 84,
          suffix: "%",
          icon: "clock",
        },
        {
          value: "4.6/5.0",
          label: "CSAT",
          countTo: 4.6,
          suffix: "/5.0",
          decimals: 1,
          icon: "star",
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
      id: "pay-01",
      src: "/images/case-studies/payments-hub/01-unified-hub-home.jpg",
      title: "Unified Hub Home",
      caption:
        "Single entry point — “Who are you paying?” — replacing 7 fragmented navigation paths.",
      decision: "Single entry point",
    },
    {
      id: "pay-02",
      src: "/images/case-studies/payments-hub/02-confirm-amount-in-words.jpg",
      title: "Confirm + Amount in Words",
      caption:
        "₱12,500.00 spelled out as “Twelve Thousand Five Hundred Pesos Only” plus smart-rail badge.",
      decision: "Amount-in-words confirm",
    },
    {
      id: "pay-03",
      src: "/images/case-studies/payments-hub/03-transaction-status-qr.jpg",
      title: "Real-Time Status + QR Ph",
      caption:
        "In-app status (Sent → Processing → Received) plus elevated QR Ph shortcut to cut hotline anxiety.",
      decision: "Real-time status + QR Ph elevation",
    },
    {
      id: "pay-04",
      src: "/images/case-studies/payments-hub/04-error-incorrect-account.jpg",
      title: "Error — Incorrect Account",
      caption:
        "Clear recovery for the #1 error (wrong account number, 32%) with an actionable tip.",
      decision: "Error-prevention + recovery",
    },
    {
      id: "pay-05",
      src: "/images/case-studies/payments-hub/05-senior-friendly-confirm.jpg",
      title: "Senior-Friendly Confirm",
      caption:
        "Large type, amount in words, and “Tap to hear amount spoken” for transfers above ₱5,000.",
      decision: "Senior-friendly mode + voice confirmation",
    },
  ],

  keyLearnings: [
    "Match the mental model or pay for it at the hotline. Organizing around 'who' instead of 'which rail' erased a whole class of confusion.",
    "Confirmation is the cheapest error prevention there is. Spelling the amount in words beat every input-validation trick we tried.",
    "Certainty is a feature. Real-time status removed the single biggest reason people called — before we optimized anything else.",
    "Placement makes habits. Awareness of QR Ph never mattered until the scan button lived on the home screen.",
  ],
};
