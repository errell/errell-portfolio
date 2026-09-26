"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "tl";

/* ---------------------------------------------------------------------------
 * Dictionary. English is the source of truth; Tagalog covers UI chrome + key
 * marketing/summary content (professional Taglish, as Filipinos actually write
 * — technical terms stay in English on purpose). Deep case-study body prose
 * stays English by design.
 * ------------------------------------------------------------------------- */
const en = {
  nav: {
    work: "Work",
    about: "About",
    resume: "Resume",
    contact: "Contact",
    hireMe: "Hire Me",
    theme: "Toggle theme",
    language: "Language",
  },
  hero: {
    badge: "Currently open to new opportunities",
    titleA: "Designing Banking Experiences",
    titleAccent: "Filipinos Actually Trust",
    subtitle:
      "Senior UX Design Manager · 15 Years · Manila, Philippines · Banking & Fintech",
    viewWork: "View My Work",
    downloadCV: "Download CV",
  },
  impact: {
    eyebrow: "Impact, by the numbers",
    labels: [
      "Agile Squads Led",
      "New AUM Generated",
      "Error Rate Reduction",
      "Years Enterprise UX",
      "PH Bank Products Shipped",
    ],
  },
  home: {
    workEyebrow: "Selected Work",
    workTitle: "Enterprise outcomes, not pretty mockups",
    workDesc:
      "Three shipped products for major Philippine banks — each measured in abandonment, adoption, and pesos, not screens.",
    capsEyebrow: "Capabilities",
    capsTitle: "A design leader who speaks product, not just pixels",
    skillTitles: [
      "UX & Design Leadership",
      "Service & Product Design",
      "Product & Project Management",
      "Industry Domains",
    ],
    ctaTitle: "Let's work together",
    ctaDesc:
      "Building a product that people need to trust with their money? I can help you design it well.",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "See the work",
  },
  clients: {
    heading: "Enterprise experience across",
    note: "Names shown for context — specific client projects confidential.",
  },
  work: {
    eyebrow: "Case Studies",
    title: "Work that moved the numbers",
    desc: "Each of these shipped to production for a major Philippine bank. Employer names are withheld for confidentiality; the outcomes are real.",
    filters: ["All", "Banking", "Fintech", "Payments", "Wealth"],
    readCase: "Read Case Study",
  },
  caseStudy: {
    label: "Case Study",
    industry: "Industry",
    timeline: "Timeline",
    team: "Team",
    sections: {
      overview: "Overview & Business Context",
      research: "Discovery & Research",
      define: "Define",
      design: "Design",
      outcomes: "Outcomes",
    },
    sub: {
      flow: "Current state → Target state",
      objectives: "Strategic objectives",
      methods: "Research methods",
      findings: "Key findings",
      personas: "Who we designed for",
      hmw: "How Might We…",
      journey: "Customer journey map",
      affinity: "Affinity map summary",
      decisions: "Design decisions",
      signature: "Signature interaction",
      iterations: "Iteration rounds",
      learnings: "Key learnings",
      prototypes: "Prototype screens",
    },
    prev: "Previous",
    next: "Next",
    allWork: "All work",
    backToAll: "Back to all case studies",
  },
  about: {
    role: "Senior UX Design Manager",
    bio: "I design digital banking and fintech products that people trust with their money — leading research, design, and delivery across multiple Agile squads for one of the Philippines' largest banks.",
    storyEyebrow: "My Story",
    storyTitle: "Fifteen years in the deep end",
    storyQuote:
      "I've spent 15 years at the intersection of people, products, and enterprise complexity — from IBM's AI platform teams to leading 5 Agile squads simultaneously at one of the Philippines' largest banks.",
    expEyebrow: "Experience",
    expTitle: "Where I've done the work",
    certEyebrow: "Credentials",
    certTitle: "Certifications & badges",
    toolsEyebrow: "Toolkit",
    toolsTitle: "Tools & technologies",
    ctaTitle: "Want the one-page version?",
    ctaDesc:
      "See my full resume, or reach out and let's talk about your product.",
    ctaResume: "View Resume",
    ctaContact: "Get in touch",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    desc: "Whether it's a role, a collaboration, or a conversation about designing products people trust with their money — I'd love to hear from you.",
    sendTitle: "Send a message",
    sendDesc: "I typically reply within a couple of business days.",
    name: "Name",
    email: "Email",
    company: "Company / Organization",
    optional: "Optional",
    subject: "Subject",
    message: "Message",
    messagePlaceholder:
      "Tell me a bit about your product or role (min. 20 characters)…",
    namePlaceholder: "Juan dela Cruz",
    send: "Send Message",
    sending: "Sending…",
    subjects: [
      "New Role / Opportunity",
      "Project Collaboration",
      "Speaking / Workshop",
      "Other",
    ],
    successTitle: "Message sent",
    successDesc: "Thanks for reaching out — I'll get back to you shortly.",
    sendAnother: "Send another message",
    preferEmail: "Prefer email?",
    phoneLabel: "Phone / Viber:",
    bookTitle: "Prefer to talk? Book a 30-min call.",
    bookDesc: "Grab a slot that works for you — no back-and-forth.",
    bookFallback: "The inline booking widget couldn't load here.",
    bookCta: "Book on Cal.com →",
    errorGeneric: "Something went wrong. Please try again.",
  },
  resume: {
    title: "Resume",
    note: "Full case studies available at",
    download: "Download PDF",
    roleLine: "Senior UX Design Manager — Banking & Fintech",
    sections: {
      summary: "Summary",
      competencies: "Core Competencies",
      experience: "Experience",
      achievements: "Selected Achievements",
      education: "Education",
      certifications: "Certifications",
      tools: "Tools & Technologies",
    },
    summaryBody:
      "Senior UX Design Manager with 15+ years designing and shipping enterprise digital products across banking, fintech, and technology consulting. Proven record leading multiple Agile squads and translating research into measurable business outcomes — reduced onboarding abandonment, billions in new AUM, and multi-million-peso support savings. Deep expertise in BSP-regulated financial experiences, accessibility (WCAG 2.1 AA), and design leadership.",
    educationBody:
      "Certified Design Sprint Facilitator — DLSU Graduate School of Business. Continuous professional education in design leadership, product innovation, and enterprise design thinking.",
    achievements: [
      "Cut digital account-opening abandonment by 58% and shifted 67% of eKYC volume out of branches.",
      "Generated ₱2.1B in new AUM within six months via a goal-first UITF investment platform (+142% new investors).",
      "Reduced payment errors 71% and support costs by ₱12.2M/month through a unified payments hub.",
      "Led UX across 5+ concurrent Agile squads for a major Philippine universal bank.",
    ],
  },
  footer: {
    tagline:
      "Senior UX Design Manager building enterprise digital banking and fintech products in the Philippines.",
    explore: "Explore",
    connect: "Connect",
    getInTouch: "Get in touch",
    rights: "All rights reserved.",
    built: "Designed & built in Manila.",
  },
  notFound: {
    title: "This page took an unexpected path",
    desc: "The page you're looking for doesn't exist or has moved. Let's get you back on track.",
    backHome: "Back home",
    viewWork: "View work",
  },
  caseStudies: {
    "digital-onboarding": {
      title: "Zero-Queue Digital Account Opening",
      subtitle:
        "A BSP-compliant eKYC onboarding flow that moves account opening from a 90-minute branch visit to under 6 minutes on a budget Android phone.",
    },
    "uitf-investment": {
      title: "Mobile-First UITF Investment Platform",
      subtitle:
        "Turning first-time savers into first-time investors by reframing a compliance form as a guided conversation — and 'UITF' as a goal you can picture.",
    },
    "payments-hub": {
      title: "Unified Payments & Transfer Hub",
      subtitle:
        "Collapsing seven tangled payment paths into one confident flow — built around 'who am I paying?' instead of 'which rail?' — ahead of the QR Ph v2.0 launch.",
    },
  },
};

type Dict = typeof en;

const tl: Dict = {
  nav: {
    work: "Mga Proyekto",
    about: "Tungkol",
    resume: "Resume",
    contact: "Makipag-ugnayan",
    hireMe: "Kunin Ako",
    theme: "Palitan ang tema",
    language: "Wika",
  },
  hero: {
    badge: "Bukas sa mga bagong oportunidad",
    titleA: "Nagdidisenyo ng Banking Experiences na",
    titleAccent: "Talagang Pinagkakatiwalaan ng mga Pinoy",
    subtitle:
      "Senior UX Design Manager · 15 Taon · Maynila, Pilipinas · Banking & Fintech",
    viewWork: "Tingnan ang Trabaho",
    downloadCV: "I-download ang CV",
  },
  impact: {
    eyebrow: "Ang epekto, sa mga numero",
    labels: [
      "Agile Squads na Pinamunuan",
      "Bagong AUM na Nalikom",
      "Bawas sa Error Rate",
      "Taon ng Enterprise UX",
      "Produkto ng PH Bank na Nailunsad",
    ],
  },
  home: {
    workEyebrow: "Piling Trabaho",
    workTitle: "Mga resulta, hindi lang magagandang mockup",
    workDesc:
      "Tatlong produktong nailunsad para sa malalaking bangko sa Pilipinas — sinusukat sa abandonment, adoption, at piso, hindi lang sa screen.",
    capsEyebrow: "Mga Kakayahan",
    capsTitle: "Isang design leader na marunong sa produkto, hindi lang sa pixel",
    skillTitles: [
      "UX & Design Leadership",
      "Service & Product Design",
      "Pamamahala ng Produkto & Proyekto",
      "Mga Domain sa Industriya",
    ],
    ctaTitle: "Magtulungan tayo",
    ctaDesc:
      "May ginagawa kang produktong kailangang pagkatiwalaan ng tao sa kanilang pera? Matutulungan kitang idisenyo ito nang maayos.",
    ctaPrimary: "Simulan ang usapan",
    ctaSecondary: "Tingnan ang trabaho",
  },
  clients: {
    heading: "Karanasan sa enterprise mula sa",
    note: "Ipinakita ang mga pangalan para sa konteksto — kumpidensyal ang mga tiyak na proyekto ng kliyente.",
  },
  work: {
    eyebrow: "Mga Case Study",
    title: "Trabahong nagpagalaw sa mga numero",
    desc: "Ang bawat isa ay nailunsad sa produksyon para sa isang malaking bangko sa Pilipinas. Kumpidensyal ang pangalan ng employer; totoo ang mga resulta.",
    filters: ["Lahat", "Banking", "Fintech", "Payments", "Wealth"],
    readCase: "Basahin ang Case Study",
  },
  caseStudy: {
    label: "Case Study",
    industry: "Industriya",
    timeline: "Tagal",
    team: "Team",
    sections: {
      overview: "Pangkalahatan & Konteksto ng Negosyo",
      research: "Pagtuklas & Pananaliksik",
      define: "Pagtukoy",
      design: "Disenyo",
      outcomes: "Mga Resulta",
    },
    sub: {
      flow: "Kasalukuyan → Nilalayon",
      objectives: "Mga estratehikong layunin",
      methods: "Mga paraan ng pananaliksik",
      findings: "Mahahalagang natuklasan",
      personas: "Kung sino ang pinag-disenyuhan",
      hmw: "Paano Kaya Natin…",
      journey: "Customer journey map",
      affinity: "Buod ng affinity map",
      decisions: "Mga desisyon sa disenyo",
      signature: "Pangunahing interaksyon",
      iterations: "Mga round ng iteration",
      learnings: "Mahahalagang natutunan",
      prototypes: "Mga prototype screen",
    },
    prev: "Nauna",
    next: "Susunod",
    allWork: "Lahat ng trabaho",
    backToAll: "Bumalik sa lahat ng case study",
  },
  about: {
    role: "Senior UX Design Manager",
    bio: "Nagdidisenyo ako ng digital banking at fintech na produktong pinagkakatiwalaan ng tao sa kanilang pera — pinapamunuan ang research, disenyo, at delivery sa maraming Agile squad para sa isa sa pinakamalalaking bangko sa Pilipinas.",
    storyEyebrow: "Ang Kwento Ko",
    storyTitle: "Labinlimang taon sa gitna ng kumplikado",
    storyQuote:
      "Labinlimang taon akong nasa pinagtagpuan ng tao, produkto, at kumplikadong enterprise — mula sa AI platform teams ng IBM hanggang sa pamumuno ng 5 Agile squad nang sabay-sabay sa isa sa pinakamalalaking bangko sa Pilipinas.",
    expEyebrow: "Karanasan",
    expTitle: "Kung saan ko ginawa ang trabaho",
    certEyebrow: "Mga Kredensyal",
    certTitle: "Mga sertipikasyon & badge",
    toolsEyebrow: "Mga Kagamitan",
    toolsTitle: "Mga tool & teknolohiya",
    ctaTitle: "Gusto mo ba ng one-page na bersyon?",
    ctaDesc:
      "Tingnan ang buo kong resume, o makipag-ugnayan at pag-usapan natin ang produkto mo.",
    ctaResume: "Tingnan ang Resume",
    ctaContact: "Makipag-ugnayan",
  },
  contact: {
    eyebrow: "Makipag-ugnayan",
    title: "Magtulungan tayo",
    desc: "Trabaho man, kolaborasyon, o usapan tungkol sa pagdidisenyo ng produktong pinagkakatiwalaan ng tao sa pera nila — gusto kong marinig ang mensahe mo.",
    sendTitle: "Magpadala ng mensahe",
    sendDesc: "Karaniwang sumasagot ako sa loob ng ilang araw ng negosyo.",
    name: "Pangalan",
    email: "Email",
    company: "Kumpanya / Organisasyon",
    optional: "Opsyonal",
    subject: "Paksa",
    message: "Mensahe",
    messagePlaceholder:
      "Sabihin mo ng kaunti ang tungkol sa produkto o role mo (min. 20 karakter)…",
    namePlaceholder: "Juan dela Cruz",
    send: "Ipadala ang Mensahe",
    sending: "Ipinapadala…",
    subjects: [
      "Bagong Role / Oportunidad",
      "Kolaborasyon sa Proyekto",
      "Speaking / Workshop",
      "Iba pa",
    ],
    successTitle: "Naipadala ang mensahe",
    successDesc: "Salamat sa pakikipag-ugnayan — babalikan kita agad.",
    sendAnother: "Magpadala ng isa pang mensahe",
    preferEmail: "Mas gusto mo ba ng email?",
    phoneLabel: "Telepono / Viber:",
    bookTitle: "Mas gusto mong mag-usap? Mag-book ng 30-min na tawag.",
    bookDesc: "Pumili ng oras na bagay sa'yo — walang paulit-ulit na pabalik-balik.",
    bookFallback: "Hindi ma-load dito ang inline booking widget.",
    bookCta: "Mag-book sa Cal.com →",
    errorGeneric: "May nangyaring mali. Pakisubukan muli.",
  },
  resume: {
    title: "Resume",
    note: "Available ang buong case studies sa",
    download: "I-download ang PDF",
    roleLine: "Senior UX Design Manager — Banking & Fintech",
    sections: {
      summary: "Buod",
      competencies: "Pangunahing Kakayahan",
      experience: "Karanasan",
      achievements: "Piling mga Tagumpay",
      education: "Edukasyon",
      certifications: "Mga Sertipikasyon",
      tools: "Mga Tool & Teknolohiya",
    },
    summaryBody:
      "Senior UX Design Manager na may mahigit 15 taong karanasan sa pagdidisenyo at paglulunsad ng enterprise digital products sa banking, fintech, at technology consulting. May napatunayang track record sa pamumuno ng maraming Agile squad at pagsasalin ng research tungo sa nasusukat na resulta — bawas na onboarding abandonment, bilyon-bilyong bagong AUM, at milyon-milyong pisong tipid sa suporta. Malalim ang kaalaman sa BSP-regulated na financial experiences, accessibility (WCAG 2.1 AA), at design leadership.",
    educationBody:
      "Certified Design Sprint Facilitator — DLSU Graduate School of Business. Tuloy-tuloy na propesyonal na edukasyon sa design leadership, product innovation, at enterprise design thinking.",
    achievements: [
      "Binawasan ang abandonment sa digital account-opening ng 58% at inilipat ang 67% ng eKYC volume palabas ng branches.",
      "Nakalikom ng ₱2.1B bagong AUM sa loob ng anim na buwan sa pamamagitan ng goal-first na UITF investment platform (+142% bagong investors).",
      "Binawasan ang payment errors ng 71% at ang gastos sa suporta ng ₱12.2M/buwan sa pamamagitan ng pinag-isang payments hub.",
      "Pinamunuan ang UX sa 5+ sabay-sabay na Agile squad para sa isang malaking universal bank sa Pilipinas.",
    ],
  },
  footer: {
    tagline:
      "Senior UX Design Manager na gumagawa ng enterprise digital banking at fintech na produkto sa Pilipinas.",
    explore: "Tuklasin",
    connect: "Kumonekta",
    getInTouch: "Makipag-ugnayan",
    rights: "Lahat ng karapatan ay nakalaan.",
    built: "Idinisenyo & ginawa sa Maynila.",
  },
  notFound: {
    title: "Hindi inaasahang landas ang narating ng page na ito",
    desc: "Wala ang hinahanap mong page o inilipat na ito. Ibalik ka namin sa tamang daan.",
    backHome: "Bumalik sa home",
    viewWork: "Tingnan ang trabaho",
  },
  caseStudies: {
    "digital-onboarding": {
      title: "Zero-Queue na Digital Account Opening",
      subtitle:
        "Isang BSP-compliant na eKYC onboarding na naglilipat ng pagbukas ng account mula 90-minutong pila sa branch tungo sa wala pang 6 minuto sa budget Android phone.",
    },
    "uitf-investment": {
      title: "Mobile-First na UITF Investment Platform",
      subtitle:
        "Ginagawang first-time investors ang mga first-time savers sa pamamagitan ng pagbabago ng compliance form tungong gabay na usapan — at ng 'UITF' tungong layuning naiisip mo.",
    },
    "payments-hub": {
      title: "Pinag-isang Payments & Transfer Hub",
      subtitle:
        "Pinagsama ang pitong magulong daan ng bayad tungo sa isang tiwalang daloy — nakabatay sa 'sino ang binabayaran ko?' sa halip na 'aling rail?' — bago ang paglunsad ng QR Ph v2.0.",
    },
  },
};

const dictionaries: Record<Lang, Dict> = { en, tl };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "tl") {
      setLangState(stored);
      document.documentElement.lang = stored === "tl" ? "fil" : "en";
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
    document.documentElement.lang = l === "tl" ? "fil" : "en";
  };

  const toggle = () => setLang(lang === "en" ? "tl" : "en");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used within LangProvider");
  return ctx;
}
