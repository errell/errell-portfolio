const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; status: number; error: string };

/**
 * Verify a Turnstile token server-side. When `optional` is true and no secret
 * is configured, the check is skipped (callers must rate-limit instead).
 */
export async function verifyTurnstile(
  token: string,
  ip: string,
  { optional = false }: { optional?: boolean } = {},
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (optional) return { ok: true, skipped: true };
    return { ok: false, status: 500, error: "Captcha is not configured." };
  }
  if (!token) {
    return { ok: false, status: 400, error: "Captcha verification is required." };
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
    if (!res.ok || !data.success) {
      return {
        ok: false,
        status: res.ok ? 400 : 502,
        error: "Captcha verification failed. Please try again.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return { ok: false, status: 502, error: "Captcha verification failed. Please try again." };
  }
}
