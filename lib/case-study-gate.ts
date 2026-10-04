import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/** Unlocks every case study in this browser. Value is an HMAC, never the password. */
export const CASE_STUDY_COOKIE = "case_study_access";

const TOKEN_LABEL = "uxtap-case-study";

function expectedPassword(): string | undefined {
  const value = process.env.CASE_STUDY_PASSWORD;
  if (!value) return undefined;
  return value;
}

/** Compare two strings without leaking length or contents through timing. */
export function passwordsMatch(submitted: string, expected: string): boolean {
  const a = createHash("sha256").update(submitted, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

function accessToken(password: string): string {
  return createHmac("sha256", password).update(TOKEN_LABEL).digest("base64url");
}

function tokensMatch(cookieValue: string, password: string): boolean {
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(accessToken(password));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Fail closed when CASE_STUDY_PASSWORD is unset or the cookie does not match. */
export function isCaseStudyUnlocked(): boolean {
  const expected = expectedPassword();
  if (!expected) return false;
  const cookie = cookies().get(CASE_STUDY_COOKIE)?.value;
  if (!cookie) return false;
  return tokensMatch(cookie, expected);
}

export function grantCaseStudyAccess(): void {
  const expected = expectedPassword();
  if (!expected) return;
  cookies().set(CASE_STUDY_COOKIE, accessToken(expected), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
