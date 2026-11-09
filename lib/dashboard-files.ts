// Copies a file a VIP client sent through the site into her client file in the
// tasks dashboard (matched there by email, then phone). Best-effort: the file is
// always in Rivky's email too, so a dashboard failure never fails the request.
// One file per request - each one is already under Vercel's 4.5MB request cap.
// Each file is tried up to 3 times (waits 0.5s, then 1.5s) on a network error or
// a 5xx answer (including Cloudflare's 520), 8s per try. Never throws.

const RETRY_DELAYS_MS = [500, 1500];

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function forwardFilesToDashboard(
  client: { email?: string; phone?: string },
  files: { label: string; filename: string; content: Buffer; contentType?: string }[],
) {
  const secret = process.env.VIP_INTAKE_SECRET;
  if (!secret || !files.length || (!client.email && !client.phone)) return;
  const url = process.env.VIP_INTAKE_FILE_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-intake-file";

  await Promise.all(
    files.map(async f => {
      for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
        const last = attempt === RETRY_DELAYS_MS.length;
        try {
          const fd = new FormData();
          fd.append("email", client.email || "");
          fd.append("phone", client.phone || "");
          fd.append("label", f.label);
          fd.append("file", new Blob([new Uint8Array(f.content)], { type: f.contentType || "application/octet-stream" }), f.filename);
          const res = await fetch(url, {
            method: "POST",
            headers: { "x-intake-secret": secret },
            body: fd,
            signal: AbortSignal.timeout(8000), // 3 tries x 8s + waits stay inside maxDuration 60
          });
          if (res.ok) return;
          const detail = await res.text().catch(() => "");
          if (res.status < 500 || last) {
            console.error("Dashboard file forward failed:", f.label, res.status, detail);
            return;
          }
          console.warn("Dashboard file forward retrying:", f.label, res.status);
        } catch (e) {
          if (last) {
            console.error("Dashboard file forward failed:", f.label, e);
            return;
          }
          console.warn("Dashboard file forward retrying:", f.label, e);
        }
        await sleep(RETRY_DELAYS_MS[attempt]);
      }
    }),
  );
}
