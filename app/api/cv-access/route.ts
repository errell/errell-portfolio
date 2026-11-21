import { NextResponse } from "next/server";
import { CV_COOKIE, createCvToken, cvCookieOptions } from "@/lib/cv-gate";
import { emailLead, storeLead, type CvLeadSource } from "@/lib/cv-leads";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const MAX_EMAIL = 254;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
type RateEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateEntry>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (rateLimitStore.size > 1000) {
    for (const [k, v] of rateLimitStore) if (now >= v.resetAt) rateLimitStore.delete(k);
  }
  const entry = rateLimitStore.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

/** Strip control characters and collapse whitespace. */
function clean(value: unknown, max: number): string {
  return String(value ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028\u2029]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max + 1);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Expected application/json." }, { status: 415 });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Email only: any other fields in the body (e.g. name, company) are ignored.
  const email = clean(body.email, MAX_EMAIL).toLowerCase();
  const source: CvLeadSource = body.source === "cv-download" ? "cv-download" : "resume-view";

  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 200)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const captcha = await verifyTurnstile(String(body.turnstileToken || "").trim(), ip, {
    optional: true,
  });
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.error }, { status: captcha.status });
  }

  const token = createCvToken();
  if (!token) {
    console.error("CV gate has no signing secret configured.");
    return NextResponse.json(
      { error: "The CV is temporarily unavailable. Please email uxtap@outlook.com." },
      { status: 500 },
    );
  }

  const lead = {
    email,
    source,
    userAgent: clean(request.headers.get("user-agent"), 512).slice(0, 512) || null,
    ip,
  };

  const stored = await storeLead(lead);
  const emailed = await emailLead(lead, stored);

  // Never silently lose a lead: at least one record (database or email) must land.
  if (stored !== "stored" && emailed !== "sent") {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(CV_COOKIE, token, cvCookieOptions);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
