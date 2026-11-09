import { env } from "./config";

export interface DashboardMatch {
  /** the dashboard answered 2xx */
  ok: boolean;
  /** the dashboard found her client file (by email, then phone) */
  matched: boolean;
}

/**
 * Writes the questionnaire text into the dashboard client file (update_vip_onboarding,
 * matched by email, then phone). Best-effort: never throws. `matched` tells whether
 * the dashboard knows her - reminders are scheduled only then (a link that uploads into
 * nobody's file would help no one, and it limits what a stranger can make us send).
 */
export async function syncOnboardingText(client: { email: string; phone: string }, onboarding: string): Promise<DashboardMatch> {
  const secret = env.intakeSecret();
  if (!secret) return { ok: false, matched: false };
  try {
    const res = await fetch(env.syncUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": secret },
      body: JSON.stringify({ email: client.email, phone: client.phone, onboarding }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[vip] dashboard onboarding sync failed:", res.status, await res.text().catch(() => ""));
      return { ok: false, matched: false };
    }
    const data = (await res.json().catch(() => null)) as { matched?: unknown } | null;
    return { ok: true, matched: data?.matched === true };
  } catch (e) {
    console.error("[vip] dashboard onboarding sync failed:", e);
    return { ok: false, matched: false };
  }
}

/**
 * Read-only check whether the dashboard knows her (used before scheduling tax
 * reminders): /api/vip-client-files answers { matched } without changing anything.
 */
export async function lookupClient(client: { email: string; phone: string }): Promise<DashboardMatch> {
  const secret = env.intakeSecret();
  if (!secret) return { ok: false, matched: false };
  try {
    const res = await fetch(env.clientFilesUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": secret },
      body: JSON.stringify({ email: client.email, phone: client.phone, sinceHours: 720, labelPrefixes: ['ת"ז'] }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[vip] dashboard client lookup failed:", res.status, await res.text().catch(() => ""));
      return { ok: false, matched: false };
    }
    const data = (await res.json().catch(() => null)) as { matched?: unknown } | null;
    return { ok: true, matched: data?.matched === true };
  } catch (e) {
    console.error("[vip] dashboard client lookup failed:", e);
    return { ok: false, matched: false };
  }
}
