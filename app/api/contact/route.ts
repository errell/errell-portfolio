import { NextResponse } from "next/server";
import { getResend, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from "@/lib/resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 100;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 5000;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

type RateEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateEntry>();

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Periodically prune stale entries to avoid unbounded growth in long-lived processes

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Never send mail without a server-side check. Production must refuse;
    // other environments refuse too so verification is not skipped.
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return {
      ok: false,
      status: 500,
      error: "Captcha is not configured. Please email directly.",
    };
  }

  if (!token) {
    return {
      ok: false,
      status: 400,
      error: "Captcha verification is required.",
    };
  }

  try {
    const params = new URLSearchParams();
    params.set("secret", secret);
    params.set("response", token);
    if (ip && ip !== "unknown") params.set("remoteip", ip);

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const data = (await res.json()) as { success?: boolean };
    if (!res.ok) {
      return {
        ok: false,
        status: 502,
        error: "Captcha verification failed. Please try again.",
      };
    }
    if (!data.success) {
      return {
        ok: false,
        status: 400,
        error: "Captcha verification failed. Please try again.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return {
      ok: false,
      status: 502,
      error: "Captcha verification failed. Please try again.",
    };
  }
}

function pruneRateLimitStore() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Unsupported content type. Expected application/json." },
      { status: 415 },
    );
  }

  const ip = getClientIp(request);
  if (rateLimitStore.size > 1000) {
    pruneRateLimitStore();
  }
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

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const subject = String(body.subject || "General Inquiry").trim();
  const message = String(body.message || "").trim();

  // Length caps
  if (name.length > MAX_NAME) {
    return NextResponse.json(
      { error: `Name must be at most ${MAX_NAME} characters.` },
      { status: 400 },
    );
  }
  if (email.length > MAX_EMAIL) {
    return NextResponse.json(
      { error: `Email must be at most ${MAX_EMAIL} characters.` },
      { status: 400 },
    );
  }
  if (company.length > MAX_COMPANY) {
    return NextResponse.json(
      { error: `Company must be at most ${MAX_COMPANY} characters.` },
      { status: 400 },
    );
  }
  if (subject.length > MAX_SUBJECT) {
    return NextResponse.json(
      { error: `Subject must be at most ${MAX_SUBJECT} characters.` },
      { status: 400 },
    );
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: `Message must be at most ${MAX_MESSAGE} characters.` },
      { status: 400 },
    );
  }

  // Validation
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );
  }
  if (message.length < 20) {
    return NextResponse.json(
      { error: "Message must be at least 20 characters." },
      { status: 400 },
    );
  }

  const turnstileToken = String(body.turnstileToken || "").trim();
  const captcha = await verifyTurnstile(turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.error }, { status: captcha.status });
  }

  const resend = getResend();
  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured. Please email directly." },
      { status: 500 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `Portfolio · ${subject} — from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin:0 0 12px;">New portfolio contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
      text: `New portfolio contact\n\nName: ${name}\nEmail: ${email}\n${
        company ? `Company: ${company}\n` : ""
      }Subject: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
