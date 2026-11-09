// HTML building blocks for the VIP emails. Every value that came from the client
// goes through escapeHtml - the helpers below escape their text arguments, and the
// *Html variants take markup that was already built from escaped parts.

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const esc = escapeHtml;

/** Escapes and keeps the client's line breaks. */
export function escMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br/>");
}

const EMPTY = "לא צוין";

export function telLink(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (!digits) return esc(phone || EMPTY);
  return `<a href="tel:${esc(digits)}" style="color:#124AF0;text-decoration:none;font-weight:bold;">${esc(phone)}</a>`;
}

export function mailLink(email: string): string {
  if (!email) return EMPTY;
  return `<a href="mailto:${esc(email)}" style="color:#124AF0;text-decoration:none;">${esc(email)}</a>`;
}

export interface TableStyle {
  compact?: boolean;
}

function cellStyle(compact?: boolean) {
  return compact
    ? { pad: "6px 10px", font: "12.5px" }
    : { pad: "10px 12px", font: "14px" };
}

/** A label/value row; both are escaped. Empty value -> "לא צוין". */
export function row(label: string, value: string, style: TableStyle = {}): string {
  return rowHtml(esc(label), value ? escMultiline(value) : EMPTY, style);
}

/** Like row, but skipped entirely when the value is empty. */
export function rowIf(label: string, value: string, style: TableStyle = {}): string {
  return value ? row(label, value, style) : "";
}

/** A row whose value is ready markup (built from escaped parts). */
export function rowHtml(labelHtml: string, valueHtml: string, style: TableStyle = {}): string {
  const s = cellStyle(style.compact);
  return `
      <tr>
        <td style="padding:${s.pad};border-bottom:1px solid #E8EDFF;color:#888;width:38%;font-size:${s.font};vertical-align:top;">${labelHtml}</td>
        <td style="padding:${s.pad};border-bottom:1px solid #E8EDFF;color:#292929;font-size:${s.font};">${valueHtml || EMPTY}</td>
      </tr>`;
}

/** A titled table; `rowsHtml` is the output of row()/rowHtml(). Title is escaped. */
export function table(title: string, rowsHtml: string, style: TableStyle = {}): string {
  if (!rowsHtml.trim()) return "";
  const head = style.compact
    ? "padding:8px 12px;background:#3A4470;color:#fff;font-weight:bold;font-size:13px;"
    : "padding:12px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:15px;";
  return `
    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:${style.compact ? 12 : 20}px;">
      <thead><tr><td colspan="2" style="${head}">${esc(title)}</td></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>`;
}

export type BoxTone = "red" | "yellow" | "green" | "blue";

const BOX_TONES: Record<BoxTone, { bg: string; border: string; color: string }> = {
  red: { bg: "#FFF1F1", border: "#FA5C5C", color: "#991B1B" },
  yellow: { bg: "#FFF8E1", border: "#F5B400", color: "#7A4F00" },
  green: { bg: "#F0FDF4", border: "#21F0B0", color: "#065F46" },
  blue: { bg: "#E8EDFF", border: "#124AF0", color: "#060D3C" },
};

/** A colored note box. Title escaped; body is markup. */
export function boxHtml(tone: BoxTone, title: string, bodyHtml: string): string {
  const t = BOX_TONES[tone];
  return `
    <div style="background:${t.bg};border-radius:10px;padding:14px 18px;margin-bottom:18px;border-right:4px solid ${t.border};">
      ${title ? `<p style="margin:0 0 6px;color:${t.color};font-weight:bold;font-size:14px;">${esc(title)}</p>` : ""}
      <div style="color:#292929;font-size:14px;line-height:1.7;">${bodyHtml}</div>
    </div>`;
}

/** <ul> of escaped strings. */
export function listHtml(items: string[]): string {
  if (!items.length) return "";
  return `<ul style="margin:4px 0 0;padding-right:20px;">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

/** The blue-headed shell used by every business email. Title/subtitle escaped. */
export function businessShell(title: string, subtitle: string, bodyHtml: string, tone: "blue" | "red" = "blue"): string {
  const bg = tone === "red" ? "#991B1B" : "#124AF0";
  const titleColor = tone === "red" ? "#fff" : "#21F0B0";
  return `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"/></head><body style="margin:0;background:#ffffff;">
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:32px;background:#F4F7FF;border-radius:16px;direction:rtl;text-align:right;">
        <div style="background:${bg};border-radius:12px;padding:20px 24px;margin-bottom:24px;">
          <h2 style="color:${titleColor};margin:0 0 4px;font-size:19px;">${esc(title)}</h2>
          <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0;">${esc(subtitle)}</p>
        </div>
        ${bodyHtml}
        <p style="color:#aaa;font-size:12px;margin-top:20px;text-align:center;">נשלח מטופס קבלת מידע VIP - matzavtzvira.co.il</p>
      </div>
    </body></html>`;
}

/** Makes a string safe as an attachment filename (keeps Hebrew). */
export function safeFilename(name: string, fallback = "file"): string {
  const cleaned = String(name || "")
    .replace(/"/g, "״") // ת"ז -> ת״ז (Hebrew gershayim) instead of a quote that breaks filenames
    .replace(/'/g, "׳")
    .replace(/[\\/:*?<>|\u0000-\u001f\u007f]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+/, "");
  const limited = cleaned.length > 180 ? cleaned.slice(0, 180) : cleaned;
  return limited || fallback;
}

/** Appends ' ש"ח' when the client typed a bare number. */
export function money(value: string): string {
  const v = (value || "").trim();
  if (!v) return "";
  return /^[\d,.\s]+$/.test(v) ? `${v} ש"ח` : v;
}
