"use server";

import { redirect } from "next/navigation";
import { getCaseStudy } from "@/data/case-studies";
import { grantCaseStudyAccess, passwordsMatch } from "@/lib/case-study-gate";

export type GateState = { error?: string };

export async function unlockCaseStudy(
  _prev: GateState,
  formData: FormData,
): Promise<GateState> {
  const submitted = String(formData.get("password") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const expected = process.env.CASE_STUDY_PASSWORD;

  // Unset or empty password never unlocks, even if the field was left blank.
  if (!expected || !passwordsMatch(submitted, expected)) {
    return { error: "Wrong password." };
  }

  grantCaseStudyAccess();

  if (getCaseStudy(slug)) {
    redirect(`/work/${slug}`);
  }
  redirect("/work");
}
