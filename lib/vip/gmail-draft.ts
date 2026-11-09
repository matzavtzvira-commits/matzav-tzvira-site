// A real Gmail draft to Ogen in the business account (phase 2 of the VIP form).
// IMAP APPEND into the Drafts folder, logged in with a Gmail app password
// (GMAIL_APP_PASSWORD in Vercel, created on matzavtzvira@gmail.com as "אתר מצב צבירה").
// The draft is sent by hand from Gmail; nothing here ever sends an email.
//
// Idempotency: with a submissionId the Message-ID is derived from it, and an existing
// message with that Message-ID (draft or already sent) is looked up before appending,
// so a retried request does not leave two drafts.
import { createHash, randomUUID } from "node:crypto";
import { ImapFlow } from "imapflow";
import MailComposer from "nodemailer/lib/mail-composer";
import { BUSINESS_EMAIL, OGEN_CC, OGEN_FROM, OGEN_TO } from "./config";
import type { MailAttachment } from "./mail";

export type DraftResult = { ok: true; duplicate?: boolean } | { ok: false; error: string };

const IMAP_HOST = "imap.gmail.com";
const DRAFT_TIMEOUT_MS = 25000;

export function gmailDraftConfigured(): boolean {
  return !!appPassword();
}

function appPassword(): string {
  // Google shows it as "abcd efgh ijkl mnop"; the spaces are not part of it.
  return (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
}

function messageIdFor(submissionId: string | null): string {
  const seed = submissionId
    ? createHash("sha256").update(`${submissionId}:ogen-draft`, "utf8").digest("hex").slice(0, 32)
    : randomUUID().replace(/-/g, "");
  return `<vip-ogen-${seed}@matzavtzvira.com>`;
}

export interface OgenDraftInput {
  subject: string;
  html: string;
  attachments: MailAttachment[];
  submissionId: string | null;
}

/** The raw RFC 822 message: from office@ (a verified "send as" address), to Ogen, cc Sari. */
export async function buildOgenDraftMessage(input: OgenDraftInput, messageId: string): Promise<Buffer> {
  const composer = new MailComposer({
    from: OGEN_FROM,
    to: OGEN_TO,
    cc: OGEN_CC,
    subject: input.subject.replace(/[\r\n\t]+/g, " "),
    html: input.html,
    messageId,
    date: new Date(),
    attachments: input.attachments.map(a => ({
      filename: a.filename,
      content: Buffer.from(a.content, "base64"),
      ...(a.contentType ? { contentType: a.contentType } : {}),
    })),
  });
  return composer.compile().build();
}

async function withTimeout<T>(p: Promise<T>, ms: number, onTimeout: () => void): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      onTimeout();
      reject(new Error(`timed out after ${ms}ms`));
    }, ms);
  });
  try {
    return await Promise.race([p, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/** Creates the Ogen draft in the business Gmail. Never throws. */
export async function createOgenDraft(input: OgenDraftInput): Promise<DraftResult> {
  const pass = appPassword();
  if (!pass) return { ok: false, error: "GMAIL_APP_PASSWORD is not set" };

  const messageId = messageIdFor(input.submissionId);
  const client = new ImapFlow({
    host: IMAP_HOST,
    port: 993,
    secure: true,
    auth: { user: BUSINESS_EMAIL, pass },
    logger: false,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  // A socket error after connect() must not crash the function.
  client.on("error", e => console.error("[vip] gmail draft: imap error", e));

  const run = async (): Promise<DraftResult> => {
    const raw = await buildOgenDraftMessage(input, messageId);
    await client.connect();
    try {
      const boxes = await client.list();
      const drafts = boxes.find(b => b.specialUse === "\\Drafts")?.path;
      if (!drafts) return { ok: false, error: "Drafts folder not found" };

      if (input.submissionId) {
        // All Mail holds the drafts and the sent messages, so an already-sent draft counts too.
        const all = boxes.find(b => b.specialUse === "\\All")?.path || drafts;
        const lock = await client.getMailboxLock(all, { readOnly: true });
        try {
          const found = await client.search({ gmraw: `rfc822msgid:${messageId}` });
          if (Array.isArray(found) && found.length) return { ok: true, duplicate: true };
        } finally {
          lock.release();
        }
      }

      const res = await client.append(drafts, raw, ["\\Draft", "\\Seen"]);
      if (!res) return { ok: false, error: "APPEND was rejected" };
      return { ok: true };
    } finally {
      await client.logout().catch(() => client.close());
    }
  };

  try {
    return await withTimeout(run(), DRAFT_TIMEOUT_MS, () => client.close());
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[vip] gmail draft failed:", msg);
    try {
      client.close();
    } catch {
      /* already closed */
    }
    return { ok: false, error: msg };
  }
}
