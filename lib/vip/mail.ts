import { createHash } from "node:crypto";
import { Resend, type CreateEmailOptions } from "resend";

// Resend never throws on API errors - it returns { data, error }. Every caller must
// look at `error`. sendMail retries only on 429 (rate limit: the request was
// rejected, so a retry cannot duplicate the email).
//
// Idempotency: the browser sends a submissionId (JSON routes) or batchId (multipart
// routes). Every send of that request passes idempotencyKey = sha256(`${id}:${kind}`),
// so a retried request cannot send the same email twice. Resend answers a repeated key
// with the original response (same payload) or 409 (different payload / still running);
// a 409 means the email was already sent, so it counts as success (id unknown).

export interface MailAttachment {
  filename: string;
  content: string; // base64
  contentType?: string;
}

export type MailResult = { ok: true; id: string; duplicate?: boolean } | { ok: false; error: string };

export function createResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const REQUEST_ID_PATTERN = /^[A-Za-z0-9:_-]{1,80}$/;

/** A valid submissionId / batchId from the browser, or null (old clients, bad input). */
export function requestId(v: unknown): string | null {
  return typeof v === "string" && REQUEST_ID_PATTERN.test(v.trim()) ? v.trim() : null;
}

/** sha256hex(`${id}:${kind}`), or undefined when the request carried no id. */
export function idemKey(id: string | null, kind: string): string | undefined {
  return id ? createHash("sha256").update(`${id}:${kind}`, "utf8").digest("hex") : undefined;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function errorText(error: unknown): string {
  if (!error) return "unknown error";
  if (typeof error === "string") return error;
  const e = error as { name?: string; message?: string; statusCode?: number | null };
  return [e.statusCode, e.name, e.message].filter(v => v !== undefined && v !== null && v !== "").join(" ") || JSON.stringify(error);
}

function isRateLimit(error: unknown): boolean {
  const e = error as { name?: string; statusCode?: number | null } | null;
  return !!e && (e.statusCode === 429 || e.name === "rate_limit_exceeded");
}

/** 409 invalid_idempotent_request / concurrent_idempotent_requests: already sent under this key. */
function isIdempotencyConflict(error: unknown): boolean {
  const e = error as { name?: string; statusCode?: number | null } | null;
  return !!e && (e.statusCode === 409 || e.name === "invalid_idempotent_request" || e.name === "concurrent_idempotent_requests");
}

export async function sendMail(
  resend: Resend,
  payload: CreateEmailOptions,
  tag: string,
  idempotencyKey?: string,
): Promise<MailResult> {
  const clean = { ...payload, subject: String(payload.subject ?? "").replace(/[\r\n\t]+/g, " ") } as CreateEmailOptions;
  for (let attempt = 0; attempt < 3; attempt++) {
    let res: Awaited<ReturnType<Resend["emails"]["send"]>>;
    try {
      res = await resend.emails.send(clean, idempotencyKey ? { idempotencyKey } : {});
    } catch (e) {
      console.error(`[vip] ${tag}: send threw`, e);
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
    if (!res.error && res.data?.id) return { ok: true, id: res.data.id };
    if (!res.error) {
      console.error(`[vip] ${tag}: send returned no id`);
      return { ok: false, error: "no email id returned" };
    }
    if (idempotencyKey && isIdempotencyConflict(res.error)) {
      console.warn(`[vip] ${tag}: already sent under this idempotency key`, res.error);
      return { ok: true, id: "", duplicate: true };
    }
    if (isRateLimit(res.error) && attempt < 2) {
      await sleep(1000 * (attempt + 1));
      continue;
    }
    console.error(`[vip] ${tag}: send failed`, res.error);
    return { ok: false, error: errorText(res.error) };
  }
  return { ok: false, error: "rate limited" };
}

export async function cancelMail(resend: Resend, id: string, tag: string): Promise<boolean> {
  if (!id) return false;
  try {
    const { error } = await resend.emails.cancel(id);
    if (error) {
      console.error(`[vip] ${tag}: cancel ${id} failed`, error);
      return false;
    }
    return true;
  } catch (e) {
    console.error(`[vip] ${tag}: cancel ${id} threw`, e);
    return false;
  }
}

export function toAttachment(filename: string, content: Buffer, contentType?: string): MailAttachment {
  return { filename, content: content.toString("base64"), ...(contentType ? { contentType } : {}) };
}
