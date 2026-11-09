// Multipart file handling shared by /api/vip-onboarding-files and
// /api/vip-pending-upload, plus fetching the client's Ogen files back from the dashboard.
import { FILE_ID_PATTERN, MAX_FILES_PER_REQUEST, MAX_LABEL_LENGTH, MAX_OGEN_ATTACHMENT_BYTES, MAX_REQUEST_FILE_BYTES, env } from "./config";
import { safeFilename } from "./html";
import { toAttachment, type MailAttachment } from "./mail";

export interface IncomingFile {
  fileId: string; // "tzHer", "tzHer_2", "payslip_her_1"
  label: string; // Hebrew label, raw (dashboard + display)
  originalName: string;
  content: Buffer;
  contentType: string;
}

export class FileRequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

// Only photos and PDFs: any image/* except SVG (it can carry script), or application/pdf.
// When the browser sends no type or a generic one, the extension decides.
const EXT_TYPES: Readonly<Record<string, string>> = {
  jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", heic: "image/heic", heif: "image/heif", webp: "image/webp",
  gif: "image/gif", bmp: "image/bmp", tif: "image/tiff", tiff: "image/tiff", pdf: "application/pdf",
};
const GENERIC_TYPES = new Set(["", "application/octet-stream", "binary/octet-stream", "application/unknown", "application/x-unknown"]);
export const UNSUPPORTED_TYPE_MESSAGE = "סוג קובץ לא נתמך. אפשר להעלות תמונה או PDF.";

/** The content type to store the file with, or null when the file is not a photo / PDF. */
export function acceptedContentType(type: string, name: string): string | null {
  const t = String(type || "").toLowerCase().split(";")[0].trim();
  if (t === "application/pdf") return t;
  if (t.startsWith("image/")) return t === "image/svg+xml" ? null : t;
  if (!GENERIC_TYPES.has(t)) return null;
  const dot = String(name || "").lastIndexOf(".");
  if (dot < 0) return null;
  return EXT_TYPES[name.slice(dot + 1).toLowerCase()] ?? null;
}

function isFile(v: FormDataEntryValue | null): v is File {
  return !!v && typeof v !== "string" && typeof (v as File).arrayBuffer === "function";
}

/** Collects `file_<id>` entries. Each file is resolved to a label by `labelFor`. */
export async function readFormFiles(
  form: FormData,
  labelFor: (fileId: string) => string | null,
): Promise<IncomingFile[]> {
  const entries: Array<{ fileId: string; file: File }> = [];
  for (const [key, value] of form.entries()) {
    if (!key.startsWith("file_")) continue;
    if (!isFile(value) || value.size === 0) continue;
    const fileId = key.slice(5);
    if (!FILE_ID_PATTERN.test(fileId)) throw new FileRequestError(`מזהה קובץ לא תקין: ${fileId}`, 400);
    entries.push({ fileId, file: value });
  }
  if (entries.length > MAX_FILES_PER_REQUEST) {
    throw new FileRequestError(`אפשר לשלוח עד ${MAX_FILES_PER_REQUEST} קבצים בכל פעם`, 400);
  }
  const total = entries.reduce((s, e) => s + e.file.size, 0);
  if (total > MAX_REQUEST_FILE_BYTES) throw new FileRequestError("הקבצים גדולים מדי לשליחה אחת", 413);

  const types = entries.map(e => acceptedContentType(e.file.type, e.file.name));
  if (types.some(t => t === null)) throw new FileRequestError(UNSUPPORTED_TYPE_MESSAGE, 415);

  const out: IncomingFile[] = [];
  for (const [i, { fileId, file }] of entries.entries()) {
    const label = labelFor(fileId);
    if (label === null) throw new FileRequestError(`קובץ לא צפוי: ${fileId}`, 400);
    if (!label || label.length > MAX_LABEL_LENGTH) throw new FileRequestError(`תווית לא תקינה לקובץ ${fileId}`, 400);
    out.push({
      fileId,
      label,
      originalName: dedupeSuffix(fileId, file.name || "file"),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: types[i] as string,
    });
  }
  return out;
}

/**
 * Extra files of one field arrive as "<id>_2", "<id>_3"... From the second one on,
 * " (N)" is added to the original name, so two phone photos both called
 * "image.jpg" do not collide in the dashboard folder.
 */
function dedupeSuffix(fileId: string, name: string): string {
  const m = fileId.match(/_(\d+)$/);
  const n = m ? Number(m[1]) : 1;
  if (n < 2) return name;
  const dot = name.lastIndexOf(".");
  return dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`;
}

/** Attachments named "<label> - <original name>", unique within the email. */
export function filesToAttachments(files: IncomingFile[]): { attachments: MailAttachment[]; names: string[] } {
  const used = new Set<string>();
  const attachments: MailAttachment[] = [];
  const names: string[] = [];
  for (const f of files) {
    const display = `${f.label} - ${f.originalName}`;
    const base = safeFilename(display);
    const dot = base.lastIndexOf(".");
    let filename = base;
    for (let i = 2; used.has(filename); i++) {
      filename = dot > 0 ? `${base.slice(0, dot)} (${i})${base.slice(dot)}` : `${base} (${i})`;
    }
    used.add(filename);
    attachments.push(toAttachment(filename, f.content, f.contentType));
    names.push(display);
  }
  return { attachments, names };
}

export const OGEN_LABEL_PREFIXES = ['ת"ז', "ספח", "תעודת לידה", "תלוש שכר"];

export interface OgenFilesResult {
  attachments: MailAttachment[];
  /** Dashboard names ("<label> - <original>") of the files that were attached. */
  attachedNames: string[];
  /** the dashboard listing itself failed */
  failed: boolean;
}

/**
 * The client's Ogen files (IDs, ספח, birth certificate, payslips) uploaded in the
 * last 24h, fetched back from the dashboard so they can be attached to the
 * forward-ready Ogen email. Never throws.
 */
export async function fetchOgenFiles(client: { email: string; phone: string }): Promise<OgenFilesResult> {
  const none: OgenFilesResult = { attachments: [], attachedNames: [], failed: true };
  const secret = env.intakeSecret();
  if (!secret) return none;
  try {
    const res = await fetch(env.clientFilesUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": secret },
      body: JSON.stringify({ email: client.email, phone: client.phone, sinceHours: 24, labelPrefixes: OGEN_LABEL_PREFIXES }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("[vip] client files list failed:", res.status, await res.text().catch(() => ""));
      return none;
    }
    const data = (await res.json()) as {
      ok?: boolean;
      files?: Array<{ name?: string; label?: string; size?: number | null; contentType?: string | null; url?: string | null }>;
    };
    const files = Array.isArray(data.files) ? data.files : [];
    if (!files.length) return { attachments: [], attachedNames: [], failed: false };

    let total = 0;
    const used = new Set<string>();
    const downloaded = await Promise.all(
      files.map(async f => {
        if (!f.url) return null;
        try {
          const r = await fetch(f.url, { signal: AbortSignal.timeout(15000) });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return { f, buf: Buffer.from(await r.arrayBuffer()), type: f.contentType || r.headers.get("content-type") || undefined };
        } catch (e) {
          console.error("[vip] client file download failed:", f.name, e);
          return null;
        }
      }),
    );
    const attachments: MailAttachment[] = [];
    const attachedNames: string[] = [];
    for (const d of downloaded) {
      if (!d) continue;
      if (total + d.buf.length > MAX_OGEN_ATTACHMENT_BYTES) {
        console.warn("[vip] Ogen attachment skipped (size cap):", d.f.name);
        continue;
      }
      total += d.buf.length;
      let filename = safeFilename(d.f.name || "file");
      for (let i = 2; used.has(filename); i++) filename = `${i}-${safeFilename(d.f.name || "file")}`;
      used.add(filename);
      attachments.push(toAttachment(filename, d.buf, d.type));
      attachedNames.push(d.f.name || "");
    }
    return { attachments, attachedNames, failed: false };
  } catch (e) {
    console.error("[vip] client files fetch failed:", e);
    return none;
  }
}
