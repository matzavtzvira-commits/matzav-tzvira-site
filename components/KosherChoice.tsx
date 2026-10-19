"use client";

// Kosher-tracks question for the VIP lead forms (/vip, /vip/waitlist, /vip/maastariot).
// Styled for the blue form card. Value is sent to /api/vip-contact as `kosher`.
export const KOSHER_OPTIONS = [
  { value: "required", label: "כן, חשוב לי מסלול כשר" },
  { value: "not-required", label: "לא מחייב" },
] as const;

const green = "#21F0B0";
const navy = "#060D3C";
const white = "#FFFFFF";

export default function KosherChoice({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0, textAlign: "right" }}>
      <legend style={{ color: white, fontWeight: 700, fontSize: "0.98rem", marginBottom: 10, padding: 0 }}>
        צריך מסלולי השקעה כשרים?
      </legend>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {KOSHER_OPTIONS.map(opt => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                position: "relative",
                flex: "1 1 160px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: 12,
                padding: "12px 14px",
                textAlign: "center",
                fontSize: "0.95rem",
                fontWeight: 700,
                transition: "all 0.2s",
                background: selected ? green : "rgba(255,255,255,0.12)",
                color: selected ? navy : white,
                border: `1.5px solid ${selected ? green : "rgba(255,255,255,0.25)"}`,
              }}
            >
              <input
                type="radio"
                name="kosher"
                value={opt.value}
                required
                checked={selected}
                onChange={() => onChange(opt.value)}
                style={{ position: "absolute", opacity: 0, inset: 0, margin: 0, cursor: "pointer" }}
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
