// Curated, verified Unsplash stock imagery. Photos are used with a brand
// duotone overlay so they read as calm, on-brand texture rather than literal
// depictions. Widths are hints; next/image handles responsive optimization.

function unsplash(id: string, w = 1200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
}

export const media = {
  hero: {
    src: unsplash("1551288049-bebda4e38f71", 1400),
    alt: "Financial data and analytics on a dashboard",
  },
  about: {
    src: unsplash("1573164713988-8665fc963095", 1200),
    alt: "A designer's workspace with code and interface work",
  },
  contact: {
    src: unsplash("1556155092-490a1ba16284", 1000),
    alt: "A person using a mobile banking app",
  },
};

// Keyed by case-study slug — used on cards and case-study headers.
export const caseImages: Record<string, { src: string; alt: string }> = {
  "digital-onboarding": {
    src: unsplash("1556742049-0cfed4f6a45d", 1000),
    alt: "Using a smartphone and card to open an account",
  },
  "uitf-investment": {
    src: unsplash("1611974789855-9c2a0a7236a3", 1000),
    alt: "Investment performance and market charts",
  },
  "payments-hub": {
    src: unsplash("1526304640581-d334cdbbf45e", 1000),
    alt: "Scanning a QR code to pay with a phone",
  },
};
