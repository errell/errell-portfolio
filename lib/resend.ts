import { Resend } from "resend";

/**
 * Lazily create the Resend client so a missing key doesn't crash the build.
 * The API route validates configuration before calling send().
 */
export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "uxtap@outlook.com";

export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
