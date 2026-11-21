import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CvGate } from "@/components/resume/CvGate";
import { isCvUnlocked } from "@/lib/cv-gate";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Download CV",
  robots: { index: false, follow: true },
};

export default function CvPage() {
  if (isCvUnlocked()) redirect("/cv/download");
  return <CvGate source="cv-download" />;
}
