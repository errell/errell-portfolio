import type { ShowcaseCaseStudy, ShowcaseImage } from "@/types/case-study";

// Copy follows the Bench CV Exporter case-study deck. Concept prototype with
// fictional sample data: no outcome metrics are claimed. Only sprint facts.

const IMG = "/images/case-studies/bench-cv-exporter";

function screen(file: string, alt: string): ShowcaseImage {
  return { src: `${IMG}/${file}`, alt, width: 1440, height: 900 };
}

export const benchCvExporter: ShowcaseCaseStudy = {
  kind: "showcase",
  slug: "bench-cv-exporter",
  number: "04",
  title: "Bench CV Exporter",
  subtitle:
    "An enterprise M365 web portal where bench resources enter their profile and experience once at roll-in, then export a brand-compliant CV in one click, with AI-assisted, keyword-optimized bullet suggestions.",
  tagline: "One profile. One click. A brand-ready CV.",
  industry: "Enterprise · Internal Tools",
  timeline: "Sprint 17 · Oct 19–30, 2026",
  team: "10 FTEs · UI/UX",
  tags: ["Enterprise", "M365", "AI-assisted"],
  heroMetrics: [
    {
      value: "Sprint 17",
      label: "Oct 19–30, 2026",
      baseline: "ended in a sprint demo",
      icon: "clock",
    },
    {
      value: "10",
      label: "FTEs",
      baseline: "at 4 project hours a day",
      icon: "id",
    },
    {
      value: "400",
      label: "Project hours",
      baseline: "across Sprint 17",
      icon: "check",
    },
    {
      value: "7",
      label: "Key features",
      baseline: "sign-in to bench lead view",
      icon: "phone",
    },
  ],
  previewMetrics: [
    { value: "10", label: "FTEs" },
    { value: "400", label: "Project hours" },
  ],
  disclaimer: "Concept prototype · fictional sample data. No impact metrics are claimed.",
  video: {
    src: "/videos/bench-cv-exporter-walkthrough.mp4",
    poster: "/videos/bench-cv-exporter-poster.jpg",
    type: "video/mp4",
    width: 1280,
    height: 720,
    duration: "9:23",
    title: "Prototype walkthrough",
    description:
      "A narrated walk through the concept prototype, from the landing page and Microsoft sign-in to the bench lead view.",
  },
  challenge: [
    {
      title: "Rebuilt for every reach-out",
      detail: "CVs are rebuilt manually each time a project reaches out.",
    },
    {
      title: "Inconsistent formats",
      detail: "Formats vary by author and drift from the standard template.",
    },
    {
      title: "Weak keywords",
      detail: "CVs get missed when they are matched against demand.",
    },
    {
      title: "Slow submissions",
      detail: "Submissions lag, and bench leads chase updates.",
    },
  ],
  opportunity: {
    headline: "From CVs rebuilt per reach-out to one profile and one click.",
    detail:
      "Captured once: profile and experience are entered a single time at roll-in and reused for every CV export.",
  },
  solution: [
    {
      title: "Profile once at roll-in",
      detail: "Enter profile and experience one time, with Microsoft sign-in.",
    },
    {
      title: "AI-assisted bullets",
      detail: "AI suggests keyword-optimized bullets, backed by a quality check.",
    },
    {
      title: "One-click export",
      detail: "Export to the brand-compliant CV template.",
    },
    {
      title: "Bench lead view",
      detail: "Bench leads see CV readiness across the roster.",
    },
  ],
  features: [
    {
      id: "sign-in",
      title: "Landing page + Microsoft sign-in",
      summary: "M365 single sign-on; no new password.",
      lead: "A pre-login page explains the product, then one Microsoft sign-in takes users into the app.",
      screens: [
        screen(
          "00-landing-hero.webp",
          "Landing page hero: “Your staffing-ready CV, built once.” with Sign in with Microsoft and See how it works buttons, and a preview of the export screen and CV quality score.",
        ),
        screen(
          "01-sign-in.webp",
          "Sign-in screen: “Enter it once. Export a brand-ready CV in one click.” beside a Sign in with Microsoft panel noting single sign-on via Microsoft Entra ID.",
        ),
      ],
      callouts: [
        {
          title: "Value before sign-in",
          detail:
            "The hero states the promise: enter your profile once at roll-in, let AI sharpen bullets, export Word or PDF in one click.",
        },
        {
          title: "One clear call to action",
          detail:
            "‘Sign in with Microsoft’ leads in the hero and the header, with Microsoft 365 single sign-on, Word & PDF and ATS-readable as trust cues.",
        },
        {
          title: "Shows the result first",
          detail:
            "A preview of the export screen and the CV quality score shows what users get before they sign in.",
        },
        {
          title: "Microsoft 365 sign-in",
          detail:
            "Company M365 account via Microsoft Entra ID; no new password. CV files are stored in the user’s own OneDrive.",
        },
      ],
    },
    {
      id: "profile",
      title: "Profile once at roll-in",
      summary: "Level, role, site, skills and certs, entered once.",
      lead: "Basics, skills, certifications and education are entered one time and reused for every CV export.",
      screens: [
        screen(
          "04-profile.webp",
          "Profile screen, step 2 of 5: basics, skill tags with suggestions, certifications and education, with a profile completeness meter on the right.",
        ),
      ],
      callouts: [
        {
          title: "Guided steps",
          detail:
            "Profile is step 2 of 5 (Import, Profile, Experience, Enhance, Export), so users always know what comes next.",
        },
        {
          title: "Structured basics",
          detail:
            "Career level, role family and office location (MNL or CBU site) are picked from lists, so every CV uses the same terms.",
        },
        {
          title: "Skills with suggestions",
          detail:
            "Skills are tags; the top six appear in the CV summary, and related skills are suggested from the user’s roles.",
        },
        {
          title: "Completeness and autosave",
          detail:
            "A live completeness meter lists what is left to fix. Changes autosave and flow into every export.",
        },
      ],
    },
    {
      id: "experience",
      title: "Experience capture",
      summary: "Structured roles with prompts to add a number.",
      lead: "Structured fields and prompts turn each role into material for strong, metric-backed bullets.",
      screens: [
        screen(
          "05-experience.webp",
          "Experience screen: a list of roles with status chips, structured fields for client, role, dates, team size, scope and tools, and a prompt to add outcomes and metrics.",
        ),
      ],
      callouts: [
        {
          title: "Roles at a glance",
          detail:
            "Each role and project shows its status, such as ‘Needs metrics’ or ‘Complete’.",
        },
        {
          title: "Structured fields",
          detail:
            "Client and industry, role, dates, team size, scope and tools are captured in set fields.",
        },
        {
          title: "Prompt to add a number",
          detail:
            "Under Outcomes & metrics, a prompt asks for team size, % improvement or users served; ‘Enhance with AI’ is the next step.",
        },
        {
          title: "Date-gap check",
          detail:
            "Gaps between roles are flagged, with a nudge to add a project, training or leave note.",
        },
      ],
    },
    {
      id: "ai-enhancer",
      title: "AI bullet enhancer",
      summary: "Keyword-optimized bullets; accept, edit or reject each.",
      lead: "Raw notes become high-impact, keyword-optimized bullets, and the user stays in control.",
      screens: [
        screen(
          "06-ai-enhancer.webp",
          "AI bullet enhancer: raw notes on the left, AI-suggested bullets with highlighted keywords and Accept, Edit and Reject actions, and target keyword chips.",
        ),
      ],
      callouts: [
        {
          title: "Raw input to strong bullet",
          detail:
            "Each raw note gets a suggested bullet built from a strong verb, scope, metric and keyword.",
        },
        {
          title: "Target keywords",
          detail:
            "Keywords for the target role appear as chips, and matched keywords are highlighted in each suggestion.",
        },
        {
          title: "You stay in control",
          detail:
            "Accept, edit or reject each suggestion; Undo and ‘Accept all reviewed’ keep the user in charge.",
        },
        {
          title: "Real figures, labelled AI",
          detail:
            "Placeholders such as [X]% must be filled with real figures; output is labelled ‘AI-generated, review before use’.",
        },
      ],
    },
    {
      id: "quality-check",
      title: "Quality check",
      summary: "A score and checklist: metrics, gaps, verbs, ATS.",
      lead: "A score and a checklist show what to fix before a CV is ready for staffing.",
      screens: [
        screen(
          "07-quality-check.webp",
          "Quality check: an overall score out of 100 with a four-part breakdown, a checklist of issues with fix buttons, and passed checks.",
        ),
      ],
      callouts: [
        {
          title: "Score at a glance",
          detail:
            "A score out of 100 with a status, and how far the CV is from ‘Ready for staffing’.",
        },
        {
          title: "Score breakdown",
          detail:
            "Completeness, impact & metrics, language & verbs and ATS readability are scored separately.",
        },
        {
          title: "Fix it in one step",
          detail:
            "Each issue, such as missing metrics, a date gap or weak verbs, has a button that jumps to the fix.",
        },
        {
          title: "Passed checks",
          detail:
            "ATS readability, brand template and length are confirmed as Passed.",
        },
      ],
    },
    {
      id: "export",
      title: "One-click brand-compliant export",
      summary: "Brand-compliant, ATS-readable Word or PDF.",
      lead: "A brand-compliant, ATS-readable Word or PDF CV in one click, saved to OneDrive.",
      screens: [
        screen(
          "08-preview-export.webp",
          "Preview and export: a live single-column CV preview on the left, template status chips, and Word or PDF export options with a share-with-bench-lead toggle.",
        ),
      ],
      callouts: [
        {
          title: "Live preview",
          detail:
            "The CV renders in the standard single-column, ATS-friendly template, page by page.",
        },
        {
          title: "Brand-compliant template",
          detail:
            "Status chips confirm the CV is brand compliant and ATS readable before export.",
        },
        {
          title: "Word or PDF in one click",
          detail:
            "Pick Word (.docx) or PDF, with an editable file name; files save to OneDrive.",
        },
        {
          title: "Share with the bench lead",
          detail:
            "A toggle shares the Ready status with the bench lead; recent exports are listed below.",
        },
      ],
    },
    {
      id: "bench-lead",
      title: "Bench lead view",
      summary: "CV status, quality score and reminders per person.",
      lead: "Bench leads see CV readiness across the roster and act on it in bulk.",
      screens: [
        screen(
          "09-bench-lead-roster.webp",
          "Bench roster: summary cards, search and filters, and a table of practitioners with CV status, quality score, last update and View CV or Remind actions.",
        ),
      ],
      callouts: [
        {
          title: "Roster at a glance",
          detail:
            "Summary cards show who is on the bench, CV ready, in progress or not started, and average quality.",
        },
        {
          title: "Find the right people",
          detail:
            "Search and filter by career level, role family, MNL or CBU site, CV status and bench time.",
        },
        {
          title: "Status per practitioner",
          detail:
            "Each row shows CV status, quality score and last update, with View CV or Remind.",
        },
        {
          title: "Act in bulk",
          detail:
            "Export selected CVs as Word or PDF (ZIP), share to the staffing channel, or send reminders.",
        },
      ],
    },
  ],
  delivery: {
    intro:
      "Sprint 17 covered the UX journey and the prototype, and ended in a sprint demo with no dev handover.",
    process: ["Discovery", "Journey", "Prototype", "Demo"],
    milestones: [
      {
        dates: "Oct 19–20, 2026",
        title: "Planning & kickoff",
        detail: "Sprint 17 opens with planning and kickoff.",
      },
      {
        dates: "Oct 21–30, 2026",
        title: "Design",
        detail:
          "The UX journey and the prototype: 10 FTEs at 4 project hours a day, 400 project hours in total.",
      },
      {
        dates: "End of Sprint 17",
        title: "Sprint demo",
        detail: "Sprint 17 ends in a demo, with no dev handover.",
      },
      {
        dates: "Nov 3–16, 2026",
        title: "Sprint 18",
        detail: "Deferred Should screens + refinement.",
      },
    ],
    next: "Next: validate with bench leads and plan the M365 build.",
  },
};
