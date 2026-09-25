import type { Metadata } from "next";
import { ResumeContent } from "@/components/resume/ResumeContent";

export const metadata: Metadata = {
  title: "Resume — ATS CV",
  description:
    "ATS-friendly resume for Errell Niño, Senior UX Design Manager: summary, competencies, experience, education, certifications, achievements, and tools.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
