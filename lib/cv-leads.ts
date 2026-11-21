import { createHash } from "crypto";
import { getResend, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from "@/lib/resend";

export type CvLeadSource = "resume-view" | "cv-download";

export type CvLead = {
  email: string;
  source: CvLeadSource;
  userAgent: string | null;
  ip: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** One-way hash so repeat abuse can be spotted without storing the raw IP. */
export function hashIp(ip: string): string | null {
  if (!ip || ip === "unknown") return null;
  const salt =
    process.env.CV_ACCESS_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "uxtap-cv-leads";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/**
 * Insert into Supabase `cv_leads` via PostgREST with the service-role key.
 * Server only. Returns "skipped" when Supabase isn't configured.
 */
export async function storeLead(lead: CvLead): Promise<"stored" | "skipped" | "failed"> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "skipped";
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/cv_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: lead.email,
        source: lead.source,
        user_agent: lead.userAgent,
        ip_hash: hashIp(lead.ip),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("cv_leads insert failed:", res.status, await res.text().catch(() => ""));
      return "failed";
    }
    return "stored";
  } catch (err) {
    console.error("cv_leads insert error:", err);
    return "failed";
  }
}

/** Notify the contact inbox about the new lead. */
export async function emailLead(
  lead: CvLead,
  stored: "stored" | "skipped" | "failed",
): Promise<"sent" | "skipped" | "failed"> {
  const resend = getResend();
  if (!resend) return "skipped";
  const when = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const sourceLabel = lead.source === "cv-download" ? "CV download" : "Resume page view";
  const storage =
    stored === "stored"
      ? "Saved to Supabase (cv_leads)."
      : stored === "failed"
        ? "Supabase insert FAILED. This email is the only record."
        : "Supabase not configured. This email is the only record.";
  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: lead.email,
      subject: `New CV request: ${lead.email}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin:0 0 12px;">New CV request on uxtap.me</h2>
          <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
          <p><strong>Source:</strong> ${sourceLabel}</p>
          <p><strong>When:</strong> ${escapeHtml(when)} (Manila)</p>
          <p style="color:#666;font-size:13px;">${storage}</p>
        </div>
      `,
      text: `New CV request on uxtap.me\n\nEmail: ${lead.email}\nSource: ${sourceLabel}\nWhen: ${when} (Manila)\n\n${storage}`,
    });
    if (error) {
      console.error("Resend error (cv lead):", error);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("Resend send error (cv lead):", err);
    return "failed";
  }
}
