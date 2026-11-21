import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Unlocks the web resume and the CV PDF after a visitor leaves an email.
 * Value is `<expiry>.<hmac>`; it never contains the email or any secret.
 */
export const CV_COOKIE = "cv_access";
export const CV_ACCESS_DAYS = 30;

const TOKEN_LABEL = "uxtap-cv-access-v1";

/**
 * Prefer a dedicated CV_ACCESS_SECRET. Fall back to existing server-only
 * secrets (derived through HMAC with a distinct label, so the cookie never
 * reveals them) so the gate works without new configuration.
 */
function signingSecret(): string | undefined {
  return (
    process.env.CV_ACCESS_SECRET ||
    process.env.CASE_STUDY_PASSWORD ||
    process.env.TURNSTILE_SECRET_KEY ||
    process.env.RESEND_API_KEY ||
    undefined
  );
}

function sign(exp: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`${TOKEN_LABEL}:${exp}`)
    .digest("base64url");
}

export function createCvToken(now = Date.now()): string | null {
  const secret = signingSecret();
  if (!secret) return null;
  const exp = String(Math.floor(now / 1000) + CV_ACCESS_DAYS * 24 * 60 * 60);
  return `${exp}.${sign(exp, secret)}`;
}

/** Fail closed: no secret, malformed, expired, or bad signature → locked. */
export function verifyCvToken(value: string | undefined | null): boolean {
  const secret = signingSecret();
  if (!secret || !value) return false;
  const [exp, sig, extra] = value.split(".");
  if (!exp || !sig || extra !== undefined || !/^\d{1,12}$/.test(exp)) return false;
  if (Number(exp) * 1000 < Date.now()) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp, secret));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isCvUnlocked(): boolean {
  return verifyCvToken(cookies().get(CV_COOKIE)?.value);
}

export const cvCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: CV_ACCESS_DAYS * 24 * 60 * 60,
};
