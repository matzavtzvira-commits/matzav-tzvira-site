import { createHmac, timingSafeEqual } from "node:crypto";
import type { TokenPayload } from "./types";

// Reminder link token: base64url(JSON payload) + "." + base64url(HMAC-SHA256).
// The HMAC (key VIP_INTAKE_SECRET) is computed over the base64url payload segment,
// i.e. the exact bytes in the link.

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Buffer {
  const norm = s.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(norm + "=".repeat((4 - (norm.length % 4)) % 4), "base64");
}

function hmac(data: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(data, "utf8").digest();
}

export function signToken(payload: TokenPayload, secret: string): string {
  if (!secret) throw new Error("VIP_INTAKE_SECRET missing");
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${body}.${b64url(hmac(body, secret))}`;
}

/** Reads the payload WITHOUT checking the signature (display only). */
export function decodeTokenUnverified(token: string): TokenPayload | null {
  try {
    const [body] = String(token || "").split(".");
    if (!body) return null;
    return JSON.parse(fromB64url(body).toString("utf8")) as TokenPayload;
  } catch {
    return null;
  }
}

export type VerifyResult =
  | { ok: true; payload: TokenPayload }
  | { ok: false; reason: "invalid" | "expired" };

function sameBytes(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyToken(token: string, secret: string, now: Date = new Date()): VerifyResult {
  if (!secret || typeof token !== "string" || token.length > 8000) return { ok: false, reason: "invalid" };
  const parts = token.trim().split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, reason: "invalid" };
  const [body, sig] = parts;
  if (!/^[A-Za-z0-9_-]+$/.test(body) || !/^[A-Za-z0-9_-]+$/.test(sig)) return { ok: false, reason: "invalid" };

  const given = fromB64url(sig);
  let json: string;
  try {
    json = fromB64url(body).toString("utf8");
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (!sameBytes(given, hmac(body, secret))) return { ok: false, reason: "invalid" };

  let payload: TokenPayload;
  try {
    payload = JSON.parse(json);
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (!payload || payload.v !== 1 || !Array.isArray(payload.it) || typeof payload.x !== "number") {
    return { ok: false, reason: "invalid" };
  }
  // x is epoch seconds; tolerate milliseconds too.
  const expiresMs = payload.x > 1e12 ? payload.x : payload.x * 1000;
  if (now.getTime() > expiresMs) return { ok: false, reason: "expired" };
  return { ok: true, payload };
}
