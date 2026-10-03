import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";

// Runs before paint to set the theme class and avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);var l=localStorage.getItem('lang');if(l==='tl'){document.documentElement.lang='fil';}}catch(e){document.documentElement.classList.add('dark');}})();`;

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Errell Niño — UX Design Manager | Banking & Fintech | Manila",
    template: "%s | Errell Niño — UX Design Manager",
  },
  description:
    "Senior UX Design Manager with 15+ years building enterprise digital banking products in the Philippines. Case studies: eKYC onboarding, UITF investment, payments UX.",
  keywords: [
    "UX Design Manager",
    "UX Designer Philippines",
    "Banking UX",
    "Fintech UX",
    "Manila UX Designer",
    "Enterprise UX",
    "Errell Niño",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: site.url,
    siteName: "Errell Niño UX Portfolio",
    title: "Errell Niño — UX Design Manager | Banking & Fintech | Manila",
    description:
      "15+ years designing enterprise digital banking and fintech products in the Philippines. Data-rich case studies in eKYC, investments, and payments.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@errellnino",
    title: "Errell Niño — UX Design Manager | Banking & Fintech",
    description:
      "15+ years designing enterprise digital banking and fintech products in the Philippines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-primary antialiased">
        <Providers>
          <div className="site-shell">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-onAccent"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
