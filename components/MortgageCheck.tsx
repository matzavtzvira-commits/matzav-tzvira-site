"use client";

// Optional mortgage check for the VIP lead forms (/vip, /vip/waitlist, /vip/maastariot).
// The balance report is uploaded separately from the lead (sendMortgageReport) so a big
// file can never block the lead itself. Styled for the blue form card.

const MAX_BYTES = 4 * 1024 * 1024; // Vercel caps a request at 4.5MB
const GUIDE_URL = "/guides/mashkanta-guide.pdf";

const green = "#21F0B0";
const navy = "#060D3C";
const white = "#FFFFFF";

export async function sendMortgageReport(file: File, lead: { name: string; email: string; phone: string }) {
  const fd = new FormData();
  fd.append("name", lead.name);
  fd.append("email", lead.email);
  fd.append("phone", lead.phone);
  fd.append("mortgageReport", file);
  const res = await fetch("/api/vip-mortgage-report", { method: "POST", body: fd });
  if (!res.ok) throw new Error(String(res.status));
}

export default function MortgageCheck({
  wants,
  onWantsChange,
  file,
  onFileChange,
}: {
  wants: boolean;
  onWantsChange: (v: boolean) => void;
  file: File | null;
  onFileChange: (f: File | null) => void;
}) {
  const tooBig = !!file && file.size > MAX_BYTES;

  return (
    <div style={{ textAlign: "right" }}>
      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: white, fontWeight: 700, fontSize: "0.98rem" }}>
        <input
          type="checkbox"
          checked={wants}
          onChange={e => { onWantsChange(e.target.checked); if (!e.target.checked) onFileChange(null); }}
          style={{ width: 20, height: 20, accentColor: green, margin: 0, flexShrink: 0, cursor: "pointer" }}
        />
        אני רוצה שנבדוק גם את המשכנתא שלי
      </label>

      {wants && (
        <div style={{ marginTop: 12, background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: 12, padding: "14px 16px" }}>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 10px" }}>
            בשביל הבדיקה צריך <strong style={{ color: white }}>דוח יתרות לסילוק</strong> מהבנק.
            <br />
            <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" style={{ color: green, fontWeight: 700 }}>
              מדריך עם תמונות - איך מוציאים את הדוח בכל בנק
            </a>
          </p>

          <label style={{ display: "block", cursor: "pointer", background: file && !tooBig ? green : "rgba(255,255,255,0.14)", color: file && !tooBig ? navy : white, border: `1.5px dashed ${file && !tooBig ? green : "rgba(255,255,255,0.4)"}`, borderRadius: 10, padding: "12px 14px", textAlign: "center", fontWeight: 700, fontSize: "0.93rem", transition: "all 0.2s" }}>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={e => onFileChange(e.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
            {file ? `✓ ${file.name}` : "העלי את הדוח (PDF או צילום)"}
          </label>

          {tooBig ? (
            <p style={{ color: "#FFD0D0", fontSize: "0.85rem", margin: "8px 0 0" }}>
              הקובץ גדול מדי (עד 4MB). אפשר לצלם את הדוח או לשלוח אותו אחר כך.
            </p>
          ) : (
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", margin: "8px 0 0" }}>
              אין לך את הדוח עכשיו? אפשר לשלוח גם אחר כך.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function canUpload(file: File | null) {
  return !!file && file.size <= MAX_BYTES;
}
