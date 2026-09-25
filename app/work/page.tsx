import type { Metadata } from "next";
import { WorkContent } from "@/components/work/WorkContent";

export const metadata: Metadata = {
  title: "Work — Banking & Fintech Case Studies",
  description:
    "Three enterprise UX case studies from major Philippine banks: eKYC digital onboarding, mobile-first UITF investing, and a unified payments hub.",
};

export default function WorkPage() {
  return <WorkContent />;
}
