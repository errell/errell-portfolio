import type { Metadata } from "next";
import { ResumeContent } from "@/components/resume/ResumeContent";
import { CvGate } from "@/components/resume/CvGate";
import { isCvUnlocked } from "@/lib/cv-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume — ATS CV",
  description:
    "ATS-friendly resume for Errell Niño, Senior UX Design Manager: summary, competencies, experience, education, certifications, achievements, and tools.",
};

export default function ResumePage() {
  if (!isCvUnlocked()) return <CvGate source="resume-view" />;
  return <ResumeContent />;
}
