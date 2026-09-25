import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — 15 Years of Enterprise UX",
  description:
    "Errell Niño is a Senior UX Design Manager with 15 years at the intersection of people, products, and enterprise complexity — from IBM AI platforms to leading Agile squads at a major Philippine bank.",
};

export default function AboutPage() {
  return <AboutContent />;
}
