import type { CaseStudy } from "@/types/case-study";

export const digitalOnboarding: CaseStudy = {
  slug: "digital-onboarding",
  number: "01",
  title: "Zero-Queue Digital Account Opening",
  subtitle:
    "A BSP-compliant eKYC onboarding flow that moves account opening from a 90-minute branch visit to under 6 minutes on a budget Android phone.",
  industry: "Retail Banking",
  timeline: "16 Weeks · 4 Sprints",
  team: "1 UX Lead, 2 UX Designers, 1 Researcher, 1 Content Designer",
  tags: ["Banking", "Fintech"],
  heroMetrics: [
    {
      value: "58%",
      label: "Drop-off rate",
      baseline: "abandonment reduced",
      direction: "down",
      countTo: 58,
      suffix: "%",
      icon: "trend-down",
    },
    {
      value: "5.8 min",
      label: "Avg. completion",
      baseline: "vs. 90 min branch",
      countTo: 5.8,
      suffix: " min",
      decimals: 1,
      icon: "clock",
    },
    {
      value: "4.7/5.0",
      label: "CSAT",
      baseline: "target 4.5",
      countTo: 4.7,
      suffix: "/5.0",
      decimals: 1,
      icon: "star",
    },
    {
      value: "91%",
      label: "First-attempt ID capture",
      baseline: "vs. 34% baseline",
      countTo: 91,
      suffix: "%",
      icon: "check",
    },
  ],
  previewMetrics: [
    {
      value: "58%",
      label: "Drop-off reduction",
      direction: "down",
    },
    {
      value: "5.8 min",
      label: "Avg. completion time",
    },
  ],
  sections: {
    overview: {
      problem:
        "68% of prospective customers abandoned before ever reaching a branch, and those who arrived faced 45–90 minute waits. Every abandoned application was a customer walking straight into a neobank — Maya, GCash GSave, SeaBank — that could open an account in minutes.",
      currentState: {
        title: "Current State",
        points: [
          "Discover product online, told to visit a branch",
          "Travel to branch, take a queue number",
          "45–90 minute wait for a teller",
          "Manual form + physical ID photocopy",
          "Days-long approval, many walk out before finishing",
        ],
      },
      targetState: {
        title: "Target State",
        points: [
          "Start on phone, any time, anywhere",
          "Guided eKYC with live ID + liveness capture",
          "BSP Circular 1105 compliant verification",
          "Auto-saved progress, resumable on drop",
          "Funded account in under 8 minutes",
        ],
      },
      objectives: [
        "Deliver a fully digital, BSP Circular 1105 eKYC-compliant account opening in under 8 minutes.",
        "Cut pre-branch abandonment and shift eKYC volume out of branches.",
        "Build trust in remote identity verification for a first-time digital banking audience.",
        "Work reliably on budget Android hardware and intermittent mobile data.",
      ],
    },
    research: {
      intro:
        "We ran a mixed-methods program with 90+ participants spanning Metro Manila, Cebu, and rural Mindanao — deliberately including users banks usually design past.",
      methods: [
        {
          method: "Contextual Inquiry",
          detail: "Observed real onboarding attempts in homes and markets",
          sample: "n=24",
        },
        {
          method: "In-Depth Interviews",
          detail: "Trust, identity, and prior banking experience",
          sample: "n=30",
        },
        {
          method: "Usability Testing",
          detail: "Moderated task runs on the working prototype",
          sample: "n=36",
        },
        {
          method: "Survey",
          detail: "Abandonment drivers and device landscape",
          sample: "n=412",
        },
        {
          method: "Guerrilla Testing",
          detail: "Intercepts near branches and transport hubs",
          sample: "Metro Manila & Cebu",
        },
      ],
      findings: [
        {
          title: "ID capture was the cliff",
          detail:
            "73% of abandonments happened at the photo step — glare, cropping, and unclear framing defeated users before verification even ran.",
        },
        {
          title: "Trust deficit on liveness",
          detail:
            "Selfie and liveness detection felt invasive and suspicious; users feared their face would be misused with no explanation of why it was needed.",
        },
        {
          title: "Non-standard IDs excluded people",
          detail:
            "41% of users only held IDs the flow didn't accept, silently locking out exactly the underbanked segment we wanted to reach.",
        },
        {
          title: "No recovery on network drop",
          detail:
            "A dropped connection wiped all progress, forcing a restart — fatal on the intermittent data most participants used.",
        },
        {
          title: "Taglish over formal Filipino",
          detail:
            "Formal Filipino banking language read as cold and bureaucratic; users trusted and understood Taglish microcopy far more.",
        },
      ],
      personas: [
        {
          name: "Ate Maricel",
          role: "Public-market vendor",
          location: "Cebu",
          quote:
            "Wala akong oras pumila sa bangko. Kung pwede sa phone, mas maganda.",
          goals: [
            "Open an account between selling hours",
            "Keep daily earnings safe, not under the mattress",
          ],
          frustrations: [
            "No time for branch queues",
            "Only holds a barangay ID and a PhilHealth card",
          ],
        },
        {
          name: "Kuya Mark",
          role: "BPO employee (night shift)",
          location: "Taguig",
          quote:
            "I'm awake when banks are closed. Everything else in my life is on my phone already.",
          goals: [
            "Open an account outside 9–5 hours",
            "Get his payroll and savings in one app",
          ],
          frustrations: [
            "Branch hours clash with his shift",
            "Impatient with slow, form-heavy flows",
          ],
        },
        {
          name: "Lolo Ben",
          role: "Retiree",
          location: "Batangas",
          quote: "Basta malinaw at hindi ako maloloko, kaya ko naman ito.",
          goals: [
            "Receive pension digitally",
            "Feel confident he isn't being scammed",
          ],
          frustrations: [
            "Wary of face scanning and data misuse",
            "Needs larger text and slower, clearer steps",
          ],
        },
      ],
    },
    define: {
      hmw: [
        "How might we make ID capture succeed on the first try, on any phone?",
        "How might we make remote identity verification feel safe rather than suspicious?",
        "How might we keep progress alive through unreliable mobile data?",
        "How might we speak to first-time digital users in language they trust?",
      ],
      journey: [
        {
          stage: "Discover",
          action: "Sees ad, taps 'Open Account'",
          emotion: "positive",
          thought: "Finally, no branch?",
        },
        {
          stage: "ID Capture",
          action: "Photographs ID",
          emotion: "negative",
          thought: "Why won't it accept my photo?",
        },
        {
          stage: "Liveness",
          action: "Selfie + liveness check",
          emotion: "negative",
          thought: "Is this safe? Where does my face go?",
        },
        {
          stage: "Details",
          action: "Fills personal info",
          emotion: "neutral",
          thought: "This is a lot of typing.",
        },
        {
          stage: "Fund",
          action: "Makes first deposit",
          emotion: "positive",
          thought: "That was actually fast.",
        },
      ],
      affinity: [
        "Friction clusters at capture and verification, not data entry.",
        "Trust must be earned before the camera is ever opened.",
        "Resilience (auto-save, resume) is a feature, not a nice-to-have.",
        "Inclusion means accepting the IDs real people actually carry.",
      ],
    },
    design: {
      decisions: [
        {
          title: "Camera Coach overlay",
          detail:
            "A live framing guide with real-time glare and edge detection that walks users to a usable photo instead of rejecting them after the fact.",
        },
        {
          title: "The Trust Ladder",
          detail:
            "Before the camera opens, three progressive reassurances — BSP license, plain-language data explanation, and privacy policy — earn consent step by step.",
        },
        {
          title: "Auto-Save every 15 seconds",
          detail:
            "Progress persists continuously so a dropped connection resumes exactly where the user left off, never a restart.",
        },
        {
          title: "Expanded ID acceptance (5 → 12)",
          detail:
            "More than doubled accepted ID types to include the documents underbanked Filipinos actually hold.",
        },
        {
          title: "247 microcopy strings in Taglish",
          detail:
            "Rewrote every instruction, error, and reassurance into warm, clear Taglish validated with real users.",
        },
      ],
      wireframe: {
        title: "ID Capture — Camera Coach",
        caption:
          "Live framing guidance replaces post-hoc rejection. The frame turns cyan only when the shot will pass.",
        rows: [
          "‹ Back                              Step 2 of 5",
          "Kunan ng litrato ang iyong ID",
          "┌───────────────────────────────┐",
          "│   [ align ID within the frame ]  │",
          "│   ▢ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ▢   │",
          "│        ✓ Good lighting           │",
          "│        ✓ All edges visible        │",
          "└───────────────────────────────┘",
          "  Auto-captures when ready  ●",
          "[  Kunan ang litrato  ]",
        ],
      },
      iterations: [
        {
          round: "Round 1",
          focus: "Baseline capture flow",
          outcome: "Still 3 in 10 failed ID capture — glare was the killer",
        },
        {
          round: "Round 2",
          focus: "Added Camera Coach + auto-capture",
          outcome: "First-attempt success jumped to ~80%",
        },
        {
          round: "Round 3",
          focus: "Trust Ladder before liveness",
          outcome: "Liveness abandonment dropped sharply",
        },
        {
          round: "Round 4",
          focus: "Taglish copy + auto-save polish",
          outcome: "Completion and CSAT hit target on budget devices",
        },
      ],
    },
    outcomes: {
      intro:
        "The redesign shipped to production and moved every metric that mattered — abandonment, speed, trust, and inclusion.",
      metrics: [
        {
          value: "58%",
          label: "Drop-off rate reduction",
          direction: "down",
          countTo: 58,
          suffix: "%",
          icon: "trend-down",
        },
        {
          value: "5.8 min",
          label: "Average completion",
          baseline: "vs. 90 min branch",
          countTo: 5.8,
          suffix: " min",
          decimals: 1,
          icon: "clock",
        },
        {
          value: "4.7/5.0",
          label: "CSAT",
          baseline: "target 4.5",
          countTo: 4.7,
          suffix: "/5.0",
          decimals: 1,
          icon: "star",
        },
        {
          value: "+31",
          label: "NPS points",
          baseline: "target +25",
          countTo: 31,
          prefix: "+",
          icon: "trend-up",
        },
        {
          value: "91%",
          label: "First-attempt ID capture",
          baseline: "vs. 34%",
          countTo: 91,
          suffix: "%",
          icon: "check",
        },
        {
          value: "67%",
          label: "Fewer branch eKYC visits",
          baseline: "within 60 days",
          direction: "down",
          countTo: 67,
          suffix: "%",
          icon: "trend-down",
        },
        {
          value: "12",
          label: "Accepted ID types",
          baseline: "from 5",
          countTo: 12,
          icon: "id",
        },
        {
          value: "94%",
          label: "Mobile completion",
          baseline: "budget Android",
          countTo: 94,
          suffix: "%",
          icon: "phone",
        },
      ],
    },
  },
  keyLearnings: [
    "Trust is a design surface. Earning consent before the camera opened did more for completion than any single UI tweak.",
    "Inclusion is a metric. Accepting the IDs people actually carry unlocked an entire underbanked segment the old flow silently rejected.",
    "Resilience beats polish on real networks. Auto-save and resume mattered more than animation on intermittent mobile data.",
    "Language is trust. Taglish microcopy outperformed formal Filipino at every step for first-time digital users.",
  ],
};
